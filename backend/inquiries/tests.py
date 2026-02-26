from django.test import TestCase, override_settings
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from properties.models import Property
from inquiries.models import Inquiry

User = get_user_model()


@override_settings(ROOT_URLCONF='backend.urls')
class InquiryAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.landlord = User.objects.create_user(
            email='landlord@example.com', name='Landlord', password='pass', role='landlord'
        )
        self.tenant = User.objects.create_user(
            email='tenant@example.com', name='Tenant', password='pass', role='tenant'
        )
        self.prop = Property.objects.create(
            created_by=self.landlord,
            title='House', description='Desc', city='Nairobi', neighbourhood='West',
            price=30000, bedrooms=2, bathrooms=1, property_type='house', images=[]
        )

    def test_create_inquiry_requires_auth(self):
        response = self.client.post(
            '/api/inquiries/',
            {'listing_id': self.prop.id, 'message': 'I am interested'},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_inquiry_as_tenant(self):
        self.client.force_authenticate(user=self.tenant)
        response = self.client.post(
            '/api/inquiries/',
            {'listing_id': self.prop.id, 'message': 'I am interested'},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Inquiry.objects.count(), 1)
        self.assertEqual(Inquiry.objects.first().tenant_id, self.tenant.id)

    def test_list_inquiries_landlord_sees_own(self):
        Inquiry.objects.create(listing=self.prop, tenant=self.tenant, message='Hi')
        self.client.force_authenticate(user=self.landlord)
        response = self.client.get('/api/inquiries/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
