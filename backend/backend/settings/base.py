"""
Django base settings for RentalRadar backend.
Optimized for PostgreSQL and Docker deployment.
"""
import os
from pathlib import Path
import environ
from datetime import timedelta

import os
from pathlib import Path

# Build paths
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Environment - configured for Docker/PostgreSQL
env = environ.Env(
    # Django
    DEBUG=(bool, False),
    SECRET_KEY=(str, None),  # Must be set in production
    ALLOWED_HOSTS=(list, ['localhost', '127.0.0.1', '[::1]']),
    
    # Database - PostgreSQL required in production
    DATABASE_URL=(str, None),  # Must be set (e.g., postgres://user:pass@db:5432/rentalradar)
    DATABASE_SSL_REQUIRED=(bool, False),
    
    # JWT Settings
    JWT_ACCESS_MINUTES=(int, 60),
    JWT_REFRESH_DAYS=(int, 7),
    
    # CORS
    CORS_ALLOWED_ORIGINS=(list, ['http://localhost:5173', 'http://127.0.0.1:5173']),
    
    # Security
    CSRF_TRUSTED_ORIGINS=(list, []),
    SECURE_SSL_REDIRECT=(bool, False),
    SESSION_COOKIE_SECURE=(bool, False),
    CSRF_COOKIE_SECURE=(bool, False),
)

# Read .env file if it exists (for development)
env_file = BASE_DIR / '.env'
if env_file.exists():
    environ.Env.read_env(str(env_file))

# Core Django Settings
SECRET_KEY = env('SECRET_KEY')
DEBUG = env('DEBUG')
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'django_filters',
    'django_cleanup',  # Automatically deletes old files
    'storages',  # For Cloudinary/cloud storage
    
    # Local apps
    'users',
    'properties',
    'inquiries',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# PostgreSQL Database Configuration
DATABASES = {
    'default': env.db()  # Uses DATABASE_URL
}

# Additional PostgreSQL optimizations
DATABASES['default']['CONN_MAX_AGE'] = env.int('DB_CONN_MAX_AGE', default=60)  # Persistent connections
DATABASES['default']['OPTIONS'] = {
    'connect_timeout': 10,
    'options': '-c statement_timeout=30s',  # Prevent long-running queries
}

if env('DATABASE_SSL_REQUIRED'):
    DATABASES['default']['OPTIONS']['sslmode'] = 'require'

# Custom user model
AUTH_USER_MODEL = 'users.User'

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', 'OPTIONS': {'min_length': 8}},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static & Media Files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.NamespaceVersioning',
    'EXCEPTION_HANDLER': 'backend.utils.exception_handler.custom_exception_handler',
}

# Simple JWT Configuration
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=env('JWT_ACCESS_MINUTES')),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=env('JWT_REFRESH_DAYS')),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': True,
    
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    
    'JTI_CLAIM': 'jti',
}

# CORS Configuration
CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS')
CORS_ALLOW_CREDENTIALS = True
CORS_EXPOSE_HEADERS = ['Content-Type', 'X-CSRFToken']
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

# Security Headers (adjust in production)
if not DEBUG:
    CSRF_TRUSTED_ORIGINS = env.list('CSRF_TRUSTED_ORIGINS')
    SECURE_SSL_REDIRECT = env('SECURE_SSL_REDIRECT')
    SESSION_COOKIE_SECURE = env('SESSION_COOKIE_SECURE')
    CSRF_COOKIE_SECURE = env('CSRF_COOKIE_SECURE')
    SECURE_HSTS_SECONDS = 31536000  # 1 year
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Logging
BASE_DIR = Path(__file__).resolve().parent.parent

LOG_DIR = BASE_DIR / "logs"
LOG_DIR.mkdir(exist_ok=True)

import logging
from django.utils.log import DEFAULT_LOGGING

LOG_LEVEL = os.getenv("DJANGO_LOG_LEVEL", "INFO")

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,

    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {name} {module} {process:d} {thread:d} {message}",
            "style": "{",
        },
        "simple": {
            "format": "{levelname} {message}",
            "style": "{",
        },
    },

    "handlers": {
        # Console handler (always active)
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "verbose" if not DEBUG else "simple",
        },

        # File handler (production only)
        "file": {
            "class": "logging.handlers.RotatingFileHandler",
            "filename": LOG_DIR / "django.log",
            "maxBytes": 1024 * 1024 * 5,  # 5MB
            "backupCount": 5,
            "formatter": "verbose",
            "level": "INFO",
        },

        # Separate error log
        "error_file": {
            "class": "logging.handlers.RotatingFileHandler",
            "filename": LOG_DIR / "errors.log",
            "maxBytes": 1024 * 1024 * 5,
            "backupCount": 5,
            "formatter": "verbose",
            "level": "ERROR",
        },
    },

    "root": {
        "handlers": ["console"] if DEBUG else ["console", "file", "error_file"],
        "level": LOG_LEVEL,
    },

    "loggers": {
        "django": {
            "handlers": ["console"] if DEBUG else ["console", "file"],
            "level": LOG_LEVEL,
            "propagate": False,
        },

        "django.db.backends": {
            "handlers": ["console"] if DEBUG else ["error_file"],
            "level": "WARNING",
            "propagate": False,
        },
    },
}