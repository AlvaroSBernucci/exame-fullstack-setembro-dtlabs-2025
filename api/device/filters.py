import django_filters
from .models import Telemetry


class TelemetryFilter(django_filters.FilterSet):
    start = django_filters.IsoDateTimeFilter(field_name="created_at", lookup_expr="gte")
    end = django_filters.IsoDateTimeFilter(field_name="created_at", lookup_expr="lte")

    class Meta:
        model = Telemetry
        fields = ["device", "start", "end"]
