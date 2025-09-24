from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from device.models import Device, Telemetry
from notification.models import NotificationConfig, Notification
from django.contrib.auth import get_user_model

User = get_user_model()

class APITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="admin", password="admin")
        resp = self.client.post("/api/token/", {"username": "admin", "password": "admin"})
        self.token = resp.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

        self.device = Device.objects.create(name="Device1", user=self.user)

    def test_login_invalid(self):
        resp = self.client.post("/api/token/", {"username": "x", "password": "y"})
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_devices(self):
        resp = self.client.get("/api/v1/devices/")
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 1)

    def test_get_device(self):
        resp = self.client.get(f"/api/v1/devices/{self.device.uuid}/")
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["name"], "Device1")

    def test_patch_device(self):
        new_name = {"name": "Device"}
        resp = self.client.patch(f"/api/v1/devices/{self.device.uuid}/", new_name, format="json")
        print(resp)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["name"], "Device")

    def test_delete_device(self):
        resp = self.client.delete(f"/api/v1/devices/{self.device.uuid}/")
        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)
        from device.models import Device
        self.assertFalse(Device.objects.filter(uuid=self.device.uuid).exists())


    def test_create_telemetry(self):
        data = {
            "cpu_usage": "80",
            "ram_usage": "70",
            "hd_space_remaining": "50",
            "temperature": 60,
            "latency": 100,
            "is_connected": 1,
            "boot_time": "2025-09-23T12:00:00Z",
            "device": str(self.device.uuid),
            "device_name": self.device.name,
        }
        resp = self.client.post("/api/v1/telemetry/", data, format="json")
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Telemetry.objects.count(), 1)

    def test_notification_trigger(self):
        config = NotificationConfig.objects.create(
            user=self.user,
            parameter="cpu_usage", 
            comparison="gt", 
            threshold=50
        )
        config.devices.set([self.device])

        data = {
            "cpu_usage": "80", 
            "ram_usage": "70",
            "hd_space_remaining": "50",
            "temperature": 60,
            "latency": 100,
            "is_connected": 1,
            "boot_time": "2025-09-23T12:00:00Z",
            "device": str(self.device.uuid),
            "device_name": self.device.name,
        }
        self.client.post("/api/v1/telemetry/", data, format="json")
        self.assertEqual(Notification.objects.count(), 1)
