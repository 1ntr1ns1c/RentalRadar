from django.db import models
from django.conf import settings


class Property(models.Model):
    class PropertyType(models.TextChoices):
        APARTMENT = 'apartment', 'Apartment'
        HOUSE = 'house', 'House'
        CONDO = 'condo', 'Condo'
        STUDIO = 'studio', 'Studio'
        BEDSITTER = 'bedsitter', 'Bedsitter'
        SINGLE = 'single', 'Single'

    title = models.CharField(max_length=200)
    description = models.TextField()
    city = models.CharField(max_length=100)
    neighbourhood = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    bedrooms = models.PositiveIntegerField()
    bathrooms = models.PositiveIntegerField()
    # Store Cloudinary URLs as JSON array (PostgreSQL JSONB or text; Django JSONField)
    images = models.JSONField(default=list, blank=True)  # list of URL strings
    is_available = models.BooleanField(default=True)
    property_type = models.CharField(max_length=20, choices=PropertyType.choices)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='properties'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Properties'

    def __str__(self):
        return self.title
