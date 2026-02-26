from django.test import TestCase, override_settings
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

User = get_user_model()


@override_settings(ROOT_URLCONF='backend.urls')
class AuthRegisterLoginTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_register_success(self):
        url = reverse('auth-register')
        data = {'name': 'Test User', 'email': 'test@example.com', 'password': 'SecurePass123!', 'role': 'tenant'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', response.data)
        self.assertIn('refresh', response.data)
        self.assertEqual(response.data['email'], 'test@example.com')
        self.assertEqual(response.data['role'], 'tenant')
        self.assertTrue(User.objects.filter(email='test@example.com').exists())

    def test_register_duplicate_email(self):
        User.objects.create_user(email='existing@example.com', name='Existing', password='pass', role='tenant')
        url = reverse('auth-register')
        data = {'name': 'New', 'email': 'existing@example.com', 'password': 'SecurePass123!', 'role': 'tenant'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_missing_fields(self):
        url = reverse('auth-register')
        response = self.client.post(url, {'email': 'a@b.com'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_success(self):
        user = User.objects.create_user(email='login@example.com', name='Login', password='pass123', role='tenant')
        url = reverse('auth-login')
        response = self.client.post(url, {'email': 'login@example.com', 'password': 'pass123'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertEqual(response.data['email'], 'login@example.com')

    def test_login_invalid_credentials(self):
        url = reverse('auth-login')
        response = self.client.post(url, {'email': 'nobody@example.com', 'password': 'wrong'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_me_requires_auth(self):
        url = reverse('auth-me')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_me_returns_user(self):
        user = User.objects.create_user(email='me@example.com', name='Me', password='pass', role='landlord')
        self.client.force_authenticate(user=user)
        response = self.client.get(reverse('auth-me'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'me@example.com')
        self.assertEqual(response.data['role'], 'landlord')


@override_settings(ROOT_URLCONF='backend.urls')
class HealthCheckTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_health_returns_ok(self):
        response = self.client.get('/api/health')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'ok': True})
