from rest_framework import viewsets
from .models import Notification, NotificationConfig
from .serializers import NotificationConfigSerializer, NotificationSerializer


class NotificationConfigViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationConfigSerializer

    def get_queryset(self):
        return NotificationConfig.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class NotificationView(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer