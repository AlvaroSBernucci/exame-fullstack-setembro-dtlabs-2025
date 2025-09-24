import os
import time
import random
import requests
from datetime import datetime, timezone

API_URL = os.getenv('API_URL', 'http://app:8000/api/v1/telemetry/')
DEVICES_URL = os.getenv('DEVICES_URL', 'http://app:8000/api/v1/devices/')
LOGIN_URL = os.getenv('LOGIN_URL', 'http://app:8000/api/token/')
USERNAME = os.getenv('API_USER', 'admin')
PASSWORD = os.getenv('API_PASS', 'admin')
INTERVAL = int(os.getenv('INTERVAL', 60))

def get_jwt_token():
    while True:
        try:
            resp = requests.post(LOGIN_URL, json={'username': USERNAME, 'password': PASSWORD}, timeout=5)
            resp.raise_for_status()
            token = resp.json().get('access')
            if token:
                return token
            print("[WARN] token não retornado. Tentando novamente...")
        except requests.RequestException as e:
            print(f"[INFO] Backend não disponível ou credenciais inválidas: {e}. Tentando novamente em 5 segundos...")
            time.sleep(5)

def fetch_devices(headers):
    try:
        resp = requests.get(DEVICES_URL, headers=headers, timeout=5)
        resp.raise_for_status()
        return resp.json()
    except requests.RequestException as e:
        print(f"[ERRO] Não foi possível buscar dispositivos: {e}")
        return []

def main():
    token = get_jwt_token()
    HEADERS = {'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'}

    devices = fetch_devices(HEADERS)
    boot_times = {d['uuid']: datetime.now(timezone.utc).isoformat() for d in devices}

    while True:
        devices = fetch_devices(HEADERS) or devices

        for device in devices:
            if random.random() > 0.05:
                latency = round(random.uniform(10, 200), 2)
                is_connected = 1
            else:
                latency = 0
                is_connected = 0

            heartbeat = {
                'cpu_usage': str(round(random.uniform(0, 100), 2)),
                'ram_usage': str(round(random.uniform(0, 100), 2)),
                'hd_space_remaining': str(round(random.uniform(0, 100), 2)),
                'temperature': round(random.uniform(20, 80), 2),
                'latency': latency,
                'is_connected': is_connected,
                'boot_time': boot_times.get(device['uuid'], datetime.now(timezone.utc).isoformat()),
                'device': device['uuid'],
                'device_name': device.get('name')
            }

            try:
                r = requests.post(API_URL, json=heartbeat, headers=HEADERS, timeout=5)
                if r.status_code != 201:
                    print(f"[ERRO] BadRequest {r.status_code}: {r.text}")
            except requests.RequestException as e:
                print(f"[ERRO] Não foi possível enviar heartbeat: {e}")

        time.sleep(INTERVAL)

if __name__ == "__main__":
    main()
