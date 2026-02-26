from django.contrib import admin
from .models import Inquiry


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('id', 'listing', 'tenant', 'status', 'created_at')
    list_filter = ('status',)
    raw_id_fields = ('listing', 'tenant')
