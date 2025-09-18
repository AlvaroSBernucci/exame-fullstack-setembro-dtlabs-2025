from rest_framework import viewsets

from .models import Device, Telemetry
from .serializers import DeviceSerializer, TelemetrySerializer



class TelemetryView(viewsets.ModelViewSet):
    queryset = Telemetry.objects.all()
    serializer_class = TelemetrySerializer


class DeviceView(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    lookup_field = "uuid"

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
