from rest_framework import viewsets

from .models import Device, Telemetry
from .serializers import DeviceSerializer, TelemetrySerializer

class DeviceView(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    

class TelemetryView(viewsets.ModelViewSet):
    queryset = Telemetry.objects.all()
    serializer_class = TelemetrySerializer