from django.db import migrations
import uuid

def create_devices(apps, schema_editor):
    Device = apps.get_model('device', 'Device')
    User = apps.get_model('users', 'CustomUser')

    admin_user = User.objects.get(username='admin')
    normal_user = User.objects.get(username='user1')

    devices = [
        {'name': 'Device 1', 'location': 'Sala A', 'sn': 'SN00000001', 'description': 'Dispositivo teste 1', 'user': admin_user},
        {'name': 'Device 2', 'location': 'Sala B', 'sn': 'SN00000002', 'description': 'Dispositivo teste 2', 'user': admin_user},
        {'name': 'Device 4', 'location': 'Sala C', 'sn': 'SN00000004', 'description': 'Dispositivo teste 4', 'user': admin_user},
        {'name': 'Device 5', 'location': 'Sala C', 'sn': 'SN00000005', 'description': 'Dispositivo teste 5', 'user': admin_user},
        {'name': 'Device 6', 'location': 'Sala C', 'sn': 'SN00000006', 'description': 'Dispositivo teste 6', 'user': normal_user},
        {'name': 'Device 7', 'location': 'Sala C', 'sn': 'SN00000007', 'description': 'Dispositivo teste 7', 'user': normal_user},

    ]

    for d in devices:
        Device.objects.create(
            name=d['name'],
            location=d['location'],
            sn=d['sn'],
            description=d['description'],
            user=d['user'],
            uuid=uuid.uuid4()
        )


class Migration(migrations.Migration):

    dependencies = [
        ('device', '0006_delete_notificationconfig'),
        ('users', '0002_seed_users'), 
    ]

    operations = [
        migrations.RunPython(create_devices),
    ]
