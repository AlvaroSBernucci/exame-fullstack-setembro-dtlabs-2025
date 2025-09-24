from django.db import migrations

def create_notification_configs(apps, schema_editor):
    Device = apps.get_model('device', 'Device')
    User = apps.get_model('users', 'CustomUser')
    NotificationConfig = apps.get_model('notification', 'NotificationConfig')

    admin_user = User.objects.get(username='admin')
    normal_user = User.objects.get(username='user1')

    configs = [
        {
            "name": "Alerta CPU",
            "user": admin_user,
            "parameter": "cpu_usage",
            "comparison": "gt",
            "threshold": 80,
            "message": "Uso de CPU acima do limite"
        },
        {
            "name": "Alerta RAM",
            "user": admin_user,
            "parameter": "ram_usage",
            "comparison": "gt",
            "threshold": 70,
            "message": "Uso de RAM acima do limite"
        },
        {
            "name": "Alerta Temperatura",
            "user": normal_user,
            "parameter": "temperature",
            "comparison": "gt",
            "threshold": 50,
            "message": "Temperatura acima do limite"
        }
    ]

    for cfg in configs:
        devices = Device.objects.filter(user=cfg["user"])
        config_obj = NotificationConfig.objects.create(
            name=cfg["name"],
            user=cfg["user"],
            parameter=cfg["parameter"],
            comparison=cfg["comparison"],
            threshold=cfg["threshold"],
            message=cfg["message"]
        )
        config_obj.devices.set(devices)

class Migration(migrations.Migration):

    dependencies = [
        ('notification', '0003_notification_alert_text'),
        ('device', '0007_seed_devices'),
        ('users', '0002_seed_users'),
    ]

    operations = [
        migrations.RunPython(create_notification_configs),
    ]
