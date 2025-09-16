from rest_framework import serializers
from .models import Device, Telemetry

class DeviceSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%d/%m/%Y-%H:%M")
    updated_at = serializers.DateTimeField(format="%d/%m/%Y-%H:%M")


    class Meta:
        model = Device
        fields = ["id","uuid", "user", "name", "location", "sn", "created_at", "updated_at" ,"description"]

class TelemetrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Telemetry
        fields = "__all__"