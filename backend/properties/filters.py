import django_filters
from .models import Property


class PropertyFilter(django_filters.FilterSet):
    city = django_filters.CharFilter(lookup_expr='iexact')
    neighbourhood = django_filters.CharFilter(lookup_expr='icontains')
    bedrooms = django_filters.NumberFilter()
    bathrooms = django_filters.NumberFilter()
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    property_type = django_filters.CharFilter(lookup_expr='iexact')
    is_available = django_filters.BooleanFilter()

    class Meta:
        model = Property
        fields = ['city', 'neighbourhood', 'bedrooms', 'bathrooms', 'property_type', 'is_available']
