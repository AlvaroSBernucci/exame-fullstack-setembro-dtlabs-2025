from django.urls import path
from .views import CustomUserMeView

app_name = "users"

urlpatterns = [
  path('me/', CustomUserMeView.as_view(), name='accounts-me'),
]
