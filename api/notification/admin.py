from django.contrib import admin
from .models import NotificationConfig, Notification


admin.site.register(NotificationConfig)
admin.site.register(Notification)