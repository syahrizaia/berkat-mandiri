import os
from pathlib import Path
from fastapi import FastAPI, HTTPException
import pandas as pd
import psycopg2
from sklearn.linear_model import LinearRegression
import numpy as np
from pydantic import BaseModel
from dotenv import load_dotenv

# Penyesuaian Otomatis: Load file .env yang berada di parent directory (root Next.js)
current_dir = Path(__file__).resolve().parent
root_env_path = current_dir.parent / ".env"
load_dotenv(dotenv_path=root_env_path)

app = FastAPI(title="CV Berkat Mandiri - ML Stock Prediction Service")

DATABASE_URL = os.getenv("DATABASE_URL")

def get_historical_sales_data():
    """Mengambil riwayat penjualan bulanan dari database Neon.tech"""
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL tidak ditemukan di Environment Variables. Pastikan file .env di root terbaca.")
        
    conn = psycopg2.connect(DATABASE_URL)
    # Filter hanya transaksi INCOME (Penjualan) yang memiliki relasi bagTypeId
    query = """
        SELECT "bagTypeId", DATE_TRUNC('month', date) as month, SUM(quantity) as total_sold
        FROM "Transaction"
        WHERE type = 'INCOME' AND "bagTypeId" IS NOT NULL
        GROUP BY "bagTypeId", month
        ORDER BY month ASC;
    """
    df = pd.read_sql_query(query, conn)
    conn.close()
    return df

class PredictionResult(BaseModel):
    bagTypeId: str
    predictedNextMonth: int

@app.get("/predict", response_model=list[PredictionResult])
def predict_stock():
    try:
        df = get_historical_sales_data()
        if df.empty:
            return []
        
        predictions = []
        # Kelompokkan data berdasarkan jenis karung (bagTypeId)
        grouped = df.groupby("bagTypeId")
        
        for bag_id, group in grouped:
            group = group.sort_values("month").reset_index(drop=True)
            
            # Jika data histori kurang dari 2 bulan, gunakan rata-rata bergerak sederhana
            if len(group) < 2:
                pred_val = int(group["total_sold"].mean()) if len(group) == 1 else 100
            else:
                # Feature Engineering: Mengubah waktu bulan menjadi urutan angka indeks (0, 1, 2...)
                group['month_index'] = np.arange(len(group))
                X = group[['month_index']].values
                y = group['total_sold'].values
                
                # Menggunakan Linear Regression untuk menangkap tren kenaikan/penurunan penjualan
                model = LinearRegression()
                model.fit(X, y)
                
                # Prediksi indeks bulan depan (indeks terakhir + 1)
                next_month_index = np.array([[len(group)]])
                predicted_sales = model.predict(next_month_index)[0]
                
                # Berikan batas minimal 0 jika tren menghasilkan angka minus
                pred_val = max(0, int(np.ceil(predicted_sales)))
            
            # Kalibrasi Safety Stock (Prediksi Penjualan Bulan Depan x 1.5 untuk batas aman stok gudang)
            safety_stock_prediction = int(np.ceil(pred_val * 1.5))
            
            predictions.append(PredictionResult(
                bagTypeId=bag_id,
                predictedNextMonth=safety_stock_prediction
            ))
            
        return predictions

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Menjalankan server FastAPI pada port 8000
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)