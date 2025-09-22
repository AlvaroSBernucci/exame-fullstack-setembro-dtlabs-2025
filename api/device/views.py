from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Device, Telemetry
from notification.models import NotificationConfig, Notification
from .serializers import DeviceSerializer, TelemetrySerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import TelemetryFilter



class TelemetryView(viewsets.ModelViewSet):
    queryset = Telemetry.objects.all()
    serializer_class = TelemetrySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = TelemetryFilter

    def create(self, request, *args, **kwargs):
        data = request.data
        device_uuid = data.get("device")

        try:
            device = Device.objects.get(uuid=device_uuid)
        except Device.DoesNotExist:
            return Response({"detail": "Device não encontrado."},
                            status=status.HTTP_400_BAD_REQUEST)

        notification_configs = NotificationConfig.objects.filter(devices=device)

        alerts = []
        for config in notification_configs:
            param_value = float(data.get(config.parameter, 0))
            threshold = float(config.threshold)

            alert_triggered = False
            if config.comparison == "gt" and param_value > threshold:
                alert_triggered = True
                alert_text = f"{config.name}: {config.parameter} excedeu {threshold}"
            elif config.comparison == "lt" and param_value < threshold:
                alert_triggered = True
                alert_text = f"{config.name}: {config.parameter} abaixo de {threshold}"
            elif config.comparison == "eq" and param_value == threshold:
                alert_triggered = True
                alert_text = f"{config.name}: {config.parameter} igual a {threshold}"

            if alert_triggered:
                Notification.objects.get_or_create(
                    device=device,
                    notification_config=config,
                    alert_text=alert_text,
                )

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)

        return Response({
            "telemetry": serializer.data,
            "alerts": alerts
        }, status=status.HTTP_201_CREATED, headers=headers)

    
class DeviceView(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    filter_backends = [DjangoFilterBackend]
    lookup_field = "uuid"

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)
    

