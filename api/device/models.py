import uuid
from users.models import CustomUser
from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

class Device(models.Model):
    name = models.CharField(max_length=50, verbose_name="Nome")
    location = models.CharField(max_length=100, verbose_name="Localização")
    sn = models.CharField(max_length=12, unique=True, verbose_name="Número de série")
    description = models.TextField(blank=True)
    user = models.ForeignKey(
        CustomUser,
        to_field="uuid",
        on_delete=models.CASCADE,
        related_name="devices"
    )
    uuid = models.UUIDField(
        default=uuid.uuid4, unique=True, editable=False
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Dispositivo"
        verbose_name_plural = "Dispositivos"

    def __str__(self):
        return f"Dispositivo: {self.name}"
    


class Telemetry(models.Model):
    cpu_usage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Valor percentual entre 0 e 100."
    )
    ram_usage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Valor percentual entre 0 e 100."
    )
    hd_space_remaining = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Valor percentual entre 0 e 100."
    )
    temperature = models.FloatField(null=True, blank=True)
    latency = models.FloatField(
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        help_text="Latência em milisegundos."
    )
    is_connected = models.BooleanField(
        default=False,
        help_text="Indica se o dispositivo tem conexão com o DNS 8.8.8.8 (True=1, False=0)."
    )
    boot_time = models.DateTimeField(
        default=timezone.now,
        help_text="Timestamp em UTC+00 do momento em que o dispositivo foi ligado."
    )

    device = models.ForeignKey(Device, to_field="uuid", on_delete=models.CASCADE, related_name="telemetries")

    class Meta:
        verbose_name = "Telemetria"
        verbose_name_plural = "Telemetrias"

    def __str__(self):
        return f"{self.device.name} - {self.timestamp}"
