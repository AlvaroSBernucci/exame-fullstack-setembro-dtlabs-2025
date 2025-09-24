from django.db import migrations
from django.contrib.auth import get_user_model
import uuid

def create_users(apps, schema_editor):
    User = get_user_model()

    users = [
        {
            'username': 'admin',
            'first_name': 'Admin',
            'last_name': 'User1',
            'email': 'admin@example.com',
            'is_superuser': True,
            'is_staff': True,
            'password': 'admin', 
        },
        {
            'username': 'admin2',
            'first_name': 'Admin2',
            'last_name': 'User2',
            'email': 'admin@example.com',
            'is_superuser': True,
            'is_staff': True,
            'password': 'admin123', 
        },
        {
            'username': 'user1',
            'first_name': 'User',
            'last_name': 'One',
            'email': 'user1@example.com',
            'is_superuser': False,
            'is_staff': False,
            'password': 'user123',
        }
    ]

    for u in users:
        user = User(
            username=u['username'],
            first_name=u['first_name'],
            last_name=u['last_name'],
            email=u['email'],
            is_superuser=u['is_superuser'],
            is_staff=u['is_staff'],
            is_active=True,
            uuid=uuid.uuid4(),
        )
        user.set_password(u['password'])
        user.save()


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'), 
    ]

    operations = [
        migrations.RunPython(create_users),
    ]
