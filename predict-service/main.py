import os
from pathlib import Path
from fastapi import FastAPI, HTTPException
import pandas as pd
import psycopg2
from sklearn.linear_model import LinearRegression
import numpy as np
from pydantic import BaseModel
from dotenv import load_dotenv

# Load file .env dari parent directory (root Next.js)
current_dir = Path(__file__).resolve().parent
root_env_path = current_dir.parent / ".env"
load_dotenv(dotenv_path=root_env_path)

app = FastAPI(title="CV Berkat Mandiri - ML Stock Prediction Service")

DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

def get_historical_sales_with_names():
    """Mengambil riwayat penjualan bulanan sekaligus JOIN dengan nama BagType"""
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL tidak ditemukan di .env")
        
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    
    # Cek ketersediaan tabel Sale
    cursor.execute("""
        SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_name = 'Sale'
        );
    """)
    has_sale_table = cursor.fetchone()[0]
    
    if has_sale_table:
        # Kueri cerdas: Menggabungkan data Sale dengan nama dari BagType
        query = """
            SELECT s."bagTypeId", b.name as "bagTypeName", DATE_TRUNC('month', s.date) as month, SUM(s.quantity) as total_sold
            FROM "Sale" s
            JOIN "BagType" b ON s."bagTypeId" = b.id
            GROUP BY s."bagTypeId", b.name, month
            ORDER BY month ASC;
        """
    else:
        # Fallback ke tabel Transaction jika menggunakan skema lama
        query = """
            SELECT t."bagTypeId", b.name as "bagTypeName", DATE_TRUNC('month', t.date) as month, SUM(t.quantity) as total_sold
            FROM "Transaction" t
            JOIN "BagType" b ON t."bagTypeId" = b.id
            WHERE t.type = 'INCOME' AND t."bagTypeId" IS NOT NULL
            GROUP BY t."bagTypeId", b.name, month
            ORDER BY month ASC;
        """
        
    df = pd.read_sql_query(query, conn)
    conn.close()
    return df

# Skema data output yang dikirim kembali ke Frontend Next.js kamu
class PredictionResult(BaseModel):
    bagTypeId: str
    bagTypeName: str  # Sekarang frontend bisa langsung tahu nama karungnya!
    predictedNextMonth: int

@app.get("/predict", response_model=list[PredictionResult])
def predict_stock():
    try:
        df = get_historical_sales_with_names()
        
        print(f"=== DEBUG ML: Total data tren gabungan ditemukan = {len(df)} ===")
        if df.empty:
            return []
        
        predictions = []
        # Kelompokkan data per jenis karung berdasarkan ID dan Nama
        grouped = df.groupby(["bagTypeId", "bagTypeName"])
        
        for (bag_id, bag_name), group in grouped:
            group = group.sort_values("month").reset_index(drop=True)
            
            # Logika fallback jika data history baru sedikit (di bawah 2 bulan)
            if len(group) < 2:
                pred_val = int(group["total_sold"].mean()) if len(group) == 1 else 100
            else:
                # Feature Engineering konversi waktu ke urutan indeks angka (0, 1, 2, ...)
                group['month_index'] = np.arange(len(group))
                X = group[['month_index']].values
                y = group['total_sold'].values
                
                model = LinearRegression()
                model.fit(X, y)
                
                # Prediksi target indeks bulan depan
                next_month_index = np.array([[len(group)]])
                predicted_sales = model.predict(next_month_index)[0]
                
                pred_val = max(0, int(np.ceil(predicted_sales)))
            
            # Kalibrasi Safety Stock (Faktor Pengali 1.5 aman)
            safety_stock_prediction = int(np.ceil(pred_val * 1.5))
            
            predictions.append(PredictionResult(
                bagTypeId=bag_id,
                bagTypeName=bag_name,
                predictedNextMonth=safety_stock_prediction
            ))
            
        return predictions

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)