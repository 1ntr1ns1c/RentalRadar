from django.db import models
from django.conf import settings
from properties.models import Property


class Inquiry(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending', 'Pending'
        VIEWED = 'viewed', 'Viewed'
        RESPONDED = 'responded', 'Responded'

    listing = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='inquiries',
        db_column='listing_id'
    )
    tenant = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='inquiries'
    )
    message = models.TextField()
    landlord_response = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Inquiries'

    def __str__(self):
        return f'Inquiry #{self.id} for {self.listing_id}'
