"""
Create a system Superuser (application role = superuser) with email/password.
Usage: python manage.py createsystemsuperuser --email admin@example.com --password secret
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = 'Create a system Superuser (role=superuser) for full system control.'

    def add_arguments(self, parser):
        parser.add_argument('--email', required=True, help='Superuser email')
        parser.add_argument('--password', required=True, help='Superuser password')
        parser.add_argument('--name', default='System Admin', help='Display name')

    def handle(self, *args, **options):
        email = options['email'].strip().lower()
        password = options['password']
        name = options['name'].strip()
        if User.objects.filter(email=email).exists():
            self.stdout.write(self.style.WARNING(f'User with email {email} already exists. Exiting.'))
            return
        user = User.objects.create_superuser(email=email, password=password, name=name)
        self.stdout.write(self.style.SUCCESS(f'System Superuser created: {user.email} (id={user.id})'))
