from rest_framework import routers
from . import views


router = routers.SimpleRouter()
router.register("notification-config", views.NotificationConfigViewSet, basename="notification-config")
router.register("notifications", views.NotificationView, basename="notifications")



urlpatterns = router.urls
