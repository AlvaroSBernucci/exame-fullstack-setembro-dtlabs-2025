from rest_framework import serializers
from .models import Device, Telemetry


class TelemetrySerializer(serializers.ModelSerializer):
    device_name = serializers.CharField(source="device.name")

    class Meta:
        model = Telemetry
        fields = ["device_name", "cpu_usage" , "ram_usage", "hd_space_remaining", "temperature", "latency", "is_connected", "boot_time", "device", "created_at", "updated_at"]


class DeviceSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%d/%m/%Y - %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%d/%m/%Y - %H:%M", read_only=True)
    last_telemetry = serializers.SerializerMethodField()

    class Meta:
        model = Device
        fields = ["id","uuid", "user", "name", "location", "sn", "created_at", "updated_at" ,"description", "last_telemetry"]
        read_only_fields = ['uuid', 'sn', 'user' ,'created_at', 'updated_at']

    def get_last_telemetry(self, obj):
        telemetry = obj.telemetries.order_by("-id").first()
        if telemetry:
            return {
                "id": telemetry.id,
                "cpu_usage": telemetry.cpu_usage,
                "ram_usage": telemetry.ram_usage,
                "temperature": round(telemetry.temperature, 2) if telemetry.temperature is not None else None
            }
        return None

