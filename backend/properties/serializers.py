from rest_framework import serializers
from .models import Property


class PropertySerializer(serializers.ModelSerializer):
    created_by = serializers.PrimaryKeyRelatedField(read_only=True)
    images = serializers.ListField(
        child=serializers.URLField(allow_blank=True),
        required=False,
        allow_empty=True
    )

    class Meta:
        model = Property
        fields = (
            'id', 'title', 'description', 'city', 'neighbourhood',
            'price', 'bedrooms', 'bathrooms', 'images', 'is_available',
            'property_type', 'created_by', 'created_at'
        )
        read_only_fields = ('id', 'created_by', 'created_at')

    def validate_title(self, value):
        if len(value) > 200:
            raise serializers.ValidationError('Title must be at most 200 characters.')
        return value

    def validate_price(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError('Price cannot be negative.')
        return value

    def validate_bedrooms(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError('Bedrooms cannot be negative.')
        return value

    def validate_bathrooms(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError('Bathrooms cannot be negative.')
        return value
