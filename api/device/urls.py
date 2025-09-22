from rest_framework import routers
from . import views

router = routers.SimpleRouter()

router.register("devices", views.DeviceView, basename="devices")
router.register("telemetry", views.TelemetryView, basename="telemetry")




urlpatterns = router.urls
