FROM python:3.11-slim

# Diretório de trablho
WORKDIR /telemetria

# Copia o sender
COPY telemetry_sender.py .

# Instala dependências
RUN pip install requests django

# Executa o sender
CMD ["python", "telemetry_sender.py"]
