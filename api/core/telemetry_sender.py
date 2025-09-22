import os
import time
import random
from datetime import datetime, timezone
import django
import requests
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')
django.setup()

from device.models import Device

API_URL = os.getenv('API_URL', 'http://localhost:8000/api/v1/telemetry/')
INTERVAL = int(os.getenv('INTERVAL', 60))

LOGIN_URL = os.getenv('LOGIN_URL', 'http://localhost:8000/api/token/')
USERNAME = os.getenv('API_USER', 'seu_usuario')
PASSWORD = os.getenv('API_PASS', 'sua_senha')

try:
    resp = requests.post(LOGIN_URL, json={'username': USERNAME, 'password': PASSWORD})
    resp.raise_for_status()
    token = resp.json()['access']
except requests.RequestException as e:
    print(f"[ERRO] Não foi possível logar: {e}")
    sys.exit(1)

HEADERS = {'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'}

while True:
    devices = Device.objects.all()
    for device in devices:
        heartbeat = {
            'cpu_usage': str(round(random.uniform(0, 100), 2)),
            'ram_usage': str(round(random.uniform(0, 100), 2)),
            'hd_space_remaining': str(round(random.uniform(0, 100), 2)),
            'temperature': round(random.uniform(20, 80), 2),
            'latency': round(random.uniform(10, 200), 2) if random.random() > 0.05 else 0,
            'is_connected': bool(random.random() > 0.05),
            'boot_time': datetime.now(timezone.utc).isoformat(),
            'device': str(device.uuid),
            'device_name': device.name
        }

        print(f"[INFO] Postando heartbeat para {device.name}: {heartbeat}")

        try:
            r = requests.post(API_URL, json=heartbeat, headers=HEADERS)
            if r.status_code != 201:  # ou o status esperado da sua API
                print(f"[ERRO] BadRequest {r.status_code}: {r.text}")
        except requests.RequestException as e:
            print(f"[ERRO] Não foi possível enviar heartbeat: {e}")

    time.sleep(INTERVAL)
