"""
Production settings: HTTPS, secure cookies, HSTS, etc.
Set DJANGO_SETTINGS_MODULE=backend.settings.production (or use env).
"""
from .base import *
import environ
env = environ.Env()

# Security
SECURE_SSL_REDIRECT = env.bool('SECURE_SSL_REDIRECT', True)
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# HSTS
SECURE_HSTS_SECONDS = env.int('SECURE_HSTS_SECONDS', 31536000)
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Ensure ALLOWED_HOSTS is set in production
if not ALLOWED_HOSTS:
    raise ValueError("ALLOWED_HOSTS must be set in production (e.g. your-api.example.com)")
