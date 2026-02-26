from django.contrib import admin
from .models import Property


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'city', 'property_type', 'price', 'is_available', 'created_by', 'created_at')
    list_filter = ('property_type', 'is_available', 'city')
    search_fields = ('title', 'city', 'neighbourhood')
    raw_id_fields = ('created_by',)
