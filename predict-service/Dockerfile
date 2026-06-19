FROM python:3.10-slim

# Set kerja di dalam container
WORKDIR /code

# Copy file requirements dulu agar memanfaatkan cache Docker
COPY ./requirements.txt /code/requirements.txt

# Install dependensi
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy seluruh source code ke dalam container
COPY . .

# Eksekusi Uvicorn di port 7860 (Wajib sesuai aturan Hugging Face)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]