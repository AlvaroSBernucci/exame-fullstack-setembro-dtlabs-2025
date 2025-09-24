import os
import time
import random
import requests
from datetime import datetime, timezone

API_URL = os.getenv('API_URL', 'http://app:8000/api/v1/telemetry/')
DEVICES_URL = os.getenv('DEVICES_URL', 'http://app:8000/api/v1/devices/')
LOGIN_URL = os.getenv('LOGIN_URL', 'http://app:8000/api/token/')
USERNAME = os.getenv('API_USER')
PASSWORD = os.getenv('API_PASS')
INTERVAL = int(os.getenv('INTERVAL', 60))

while True:
    try:
        resp = requests.post(LOGIN_URL, json={'username': USERNAME, 'password': PASSWORD})
        resp.raise_for_status()
        token = resp.json()['access']
        break
    except requests.RequestException:
        print("[INFO] Backend não disponível ainda. Tentando novamente em 5 segundos...")
        time.sleep(5)

HEADERS = {'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'}

while True:
    try:
        resp = requests.get(DEVICES_URL, headers=HEADERS)
        resp.raise_for_status()
        devices = resp.json()
    except requests.RequestException as e:
        print(f"[ERRO] Não foi possível buscar dispositivos: {e}. Tentando novamente em 5 segundos...")
        time.sleep(5)
        continue

    for device in devices:
        heartbeat = {
            'cpu_usage': str(round(random.uniform(0, 100), 2)),
            'ram_usage': str(round(random.uniform(0, 100), 2)),
            'hd_space_remaining': str(round(random.uniform(0, 100), 2)),
            'temperature': round(random.uniform(20, 80), 2),
            'latency': round(random.uniform(10, 200), 2) if random.random() > 0.05 else 0,
            'is_connected': bool(random.random() > 0.05),
            'boot_time': datetime.now(timezone.utc).isoformat(),
            'device': device['uuid'],
            'device_name': device['name']
        }

        try:
            r = requests.post(API_URL, json=heartbeat, headers=HEADERS)
            if r.status_code != 201:
                print(f"[ERRO] BadRequest {r.status_code}: {r.text}")
        except requests.RequestException as e:
            print(f"[ERRO] Não foi possível enviar heartbeat: {e}")

    time.sleep(INTERVAL)
