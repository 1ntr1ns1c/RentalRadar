from rest_framework import serializers
from .models import Inquiry
from properties.serializers import PropertySerializer


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ('id', 'listing', 'tenant', 'message', 'landlord_response', 'status', 'created_at')
        read_only_fields = ('id', 'tenant', 'status', 'landlord_response', 'created_at')

    def validate_message(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError('Message is required.')
        return value.strip()


class InquiryCreateSerializer(serializers.ModelSerializer):
    listing_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Inquiry
        fields = ('listing_id', 'message')

    def validate_listing_id(self, value):
        from properties.models import Property
        if not Property.objects.filter(pk=value).exists():
            raise serializers.ValidationError('Property not found.')
        return value


class InquiryListSerializer(serializers.ModelSerializer):
    property = PropertySerializer(source='listing', read_only=True)
    tenant_info = serializers.SerializerMethodField()

    class Meta:
        model = Inquiry
        fields = ('id', 'listing', 'property', 'tenant', 'tenant_info', 'message', 'landlord_response', 'status', 'created_at')

    def get_tenant_info(self, obj):
        return {'id': obj.tenant.id, 'name': obj.tenant.name, 'email': obj.tenant.email}
