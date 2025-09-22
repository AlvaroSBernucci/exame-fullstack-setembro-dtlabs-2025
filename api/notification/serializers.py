from rest_framework import serializers
from .models import NotificationConfig, Notification

class NotificationConfigSerializer(serializers.ModelSerializer):
    devices_name = serializers.SlugRelatedField(
        source="devices",
        many=True,
        read_only=True,
        slug_field="name"
    )

    class Meta:
        model = NotificationConfig
        fields = ["id","name", "user", "parameter", "comparison", "threshold", "message", "devices_name"]

class NotificationSerializer(serializers.ModelSerializer):
    device_name = serializers.CharField(source="device.name")
    config_name = serializers.CharField(source="notification_config.name")
    parameter = serializers.CharField(source="notification_config.parameter")
    comparison = serializers.CharField(source="notification_config.comparison")
    threshold = serializers.CharField(source="notification_config.threshold")
    user = serializers.PrimaryKeyRelatedField(source="notification_config.user", read_only=True)


    class Meta:
        model = Notification
        fields = ["id", "device_name", "alert_text", "config_name", "parameter", "comparison", "threshold", "user"]