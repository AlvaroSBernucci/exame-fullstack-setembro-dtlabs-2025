import os
import time
import random
from datetime import datetime, timezone
import django
import requests

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from .models import Device 

API_URL = os.getenv('API_URL', 'http://backend:8000/api/v1/telemetry')
INTERVAL = int(os.getenv('INTERVAL', 60))

while True:
    devices = Device.objects.all()
    for device in devices:
        print(f"postando o hearthbeath: {device.name}")
        heartbeat = {
            'device_uuid': str(device.uuid),
            'cpu_usage_percent': random.uniform(0, 100),
            'ram_usage_percent': random.uniform(0, 100),
            'disk_free_percent': random.uniform(0, 100),
            'temperature_celsius': random.uniform(20, 80),
            'latency_ms': random.uniform(10, 200) if random.random() > 0.05 else 0,
            'connectivity': 1 if random.random() > 0.05 else 0,
            'boot_time_utc': datetime.now(timezone.utc).isoformat()
        }
        requests.post(API_URL, json=heartbeat)
    time.sleep(INTERVAL)
