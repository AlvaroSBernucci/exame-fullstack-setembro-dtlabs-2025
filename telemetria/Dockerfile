FROM python:3.11-slim

WORKDIR /telemetria

COPY telemetry_sender.py .

RUN pip install --no-cache-dir requests

CMD ["python", "telemetry_sender.py"]
