from django.test import TestCase, override_settings
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from properties.models import Property

User = get_user_model()


@override_settings(ROOT_URLCONF='backend.urls')
class PropertyAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.landlord = User.objects.create_user(
            email='landlord@example.com', name='Landlord', password='pass', role='landlord'
        )
        self.property_data = {
            'title': 'Nice House',
            'description': 'A nice house',
            'city': 'Nairobi',
            'neighbourhood': 'Westlands',
            'price': '50000',
            'bedrooms': 3,
            'bathrooms': 2,
            'property_type': 'house',
            'images': [],
        }

    def test_list_properties_public(self):
        Property.objects.create(created_by=self.landlord, **{k: v for k, v in self.property_data.items() if k != 'images'}, images=[])
        response = self.client.get('/api/properties/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data.get('results', response.data) if isinstance(response.data, dict) else response.data
        self.assertIsInstance(data, list)
        self.assertGreaterEqual(len(data), 1)

    def test_filter_by_city(self):
        Property.objects.create(created_by=self.landlord, **{k: v for k, v in self.property_data.items() if k != 'images'}, images=[])
        response = self.client.get('/api/properties/', {'city': 'Nairobi'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data.get('results', response.data) if isinstance(response.data, dict) else response.data
        self.assertTrue(all(p['city'] == 'Nairobi' for p in data))

    def test_create_property_requires_auth(self):
        response = self.client.post('/api/properties/', self.property_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_property_as_landlord(self):
        self.client.force_authenticate(user=self.landlord)
        response = self.client.post('/api/properties/', self.property_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Property.objects.count(), 1)
        self.assertEqual(Property.objects.first().created_by_id, self.landlord.id)

    def test_retrieve_property(self):
        prop = Property.objects.create(created_by=self.landlord, **{k: v for k, v in self.property_data.items() if k != 'images'}, images=[])
        response = self.client.get(f'/api/properties/{prop.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Nice House')
