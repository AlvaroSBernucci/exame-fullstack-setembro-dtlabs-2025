from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from device.models import Device
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
