from django.db import models
from device.models import Device
from users.models import CustomUser

PARAM_CHOICES = [
    ('cpu_usage', 'CPU Usage'),
    ('ram_usage', 'RAM Usage'),
    ('hd_space_remaining', 'HD Space remaining'),
    ('temperature', 'Temperature'),
    ('latency', 'Latency'),
]

COMPARISON_CHOICES = [
    ('gt', '>'),
    ('lt', '<'),
    ('eq', '=='),
]


class NotificationConfig(models.Model):
    name = models.CharField(max_length=30, blank=True, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    parameter = models.CharField(max_length=50, choices=PARAM_CHOICES)
    comparison = models.CharField(max_length=2, choices=COMPARISON_CHOICES)
    threshold = models.FloatField()
    message = models.TextField(blank=True, null=True)
    devices = models.ManyToManyField(Device, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}"

class Notification(models.Model):
    alert_text = models.CharField(max_length=50, blank=True, null=True)
    notification_config = models.ForeignKey(NotificationConfig, on_delete=models.CASCADE)
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.notification_config.name} - {self.device.name}"