# RentalRadar Django Backend

Django 5.x + Django REST Framework + SimpleJWT + PostgreSQL backend for RentalRadar. The React frontend continues to use the same API paths and JWT auth.

## Stack

- **Django 5.x** (5.x required for Python 3.14; 4.x causes `sessions.serializers` errors), **Python 3.10+**
- **DRF**, **djangorestframework-simplejwt** (access + refresh JWT)
- **PostgreSQL** (via `DATABASE_URL`), **django-environ**
- **django-cors-headers**, **django-filter**, **django-ratelimit**

## Setup

### 1. Virtual environment and install

```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# Unix: source venv/bin/activate
# Git bash: source venv/bin/activate

pip install -r requirements.txt
```

### 2. Environment

Copy `.env.example` to `.env` and set at least:

- `SECRET_KEY` (long random string for production)
- `DATABASE_URL` (e.g. `postgres://USER:PASSWORD@localhost:5432/DBNAME`)
- `ALLOWED_HOSTS` (comma-separated, e.g. `localhost,127.0.0.1`)
- `CORS_ALLOWED_ORIGINS` (comma-separated frontend origins)

### 3. Database and migrations

```bash
python manage.py migrate
```

### 4. Create system Superuser (optional)

System admin (role `superuser`) has full control over the app and Django admin.

```bash
python manage.py createsystemsuperuser --email admin@example.com --password YourSecurePassword
```

### 5. Run server

```bash
python manage.py runserver
```

API base: `http://localhost:8000/api/`

## API endpoints (frontend-compatible)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register; returns `token`, `refresh`, user fields |
| POST | `/api/auth/login` | No | Login; returns `token`, `refresh`, user fields |
| GET | `/api/auth/me` | Bearer | Current user |
| POST | `/api/auth/change-password` | Bearer | Change password (body: `currentPassword`, `newPassword`) |
| GET | `/api/health` | No | Health check `{"ok": true}` |
| GET | `/api/properties` | No | List properties (filter: city, bedrooms, min_price, max_price, property_type, is_available) |
| GET | `/api/properties/:id` | No | Property detail |
| POST | `/api/properties` | Admin/Superuser | Create property |
| PUT | `/api/properties/:id` | Owner/Admin/Superuser | Update property |
| DELETE | `/api/properties/:id` | Owner/Admin/Superuser | Delete property |
| POST | `/api/inquiries` | Tenant | Send inquiry (`listing_id`, `message`) |
| GET | `/api/inquiries` | Auth | List inquiries (tenant: own; landlord: for own properties; superuser: all) |
| GET | `/api/inquiries/:id` | Auth | Inquiry detail |
| POST | `/api/inquiries/:id/respond` | Landlord/Superuser | Respond (`response`) |
| PUT | `/api/inquiries/:id/status` | Landlord/Superuser | Update status |

Frontend: set `VITE_API_URL` to the backend base API URL (e.g. `http://localhost:8000/api`). The frontend sends `Authorization: Bearer <access_token>`; the backend returns `token` (access) and `refresh` on login/register.

## Roles

- **superuser**: System admin; full access to all data and Django admin.
- **landlord**: Admin/landlord; can create/edit/delete own properties and respond to inquiries on them.
- **tenant**: Can browse properties and send inquiries.

## Tests

```bash
python manage.py test users properties inquiries
```

## Docker (Postgres + Django)

```bash
cp .env.example .env
# Edit .env with SECRET_KEY etc.
docker-compose up -d db
docker-compose run --rm web python manage.py migrate
docker-compose run --rm web python manage.py createsystemsuperuser --email admin@example.com --password admin
docker-compose up web
```

Backend: `http://localhost:8000`. Point frontend `VITE_API_URL` to `http://localhost:8000/api`.

## Production

- Set `DEBUG=False`, strong `SECRET_KEY`, and `ALLOWED_HOSTS`.
- Use `DJANGO_SETTINGS_MODULE=backend.settings.production` for SSL redirect, secure cookies, HSTS.
- Serve with gunicorn/uWSGI behind HTTPS; use a real Postgres instance and env-based config.

## Next steps (checklist)

- [ ] Add Cloudinary integration for property image uploads (signed or unsigned with validation) and store URLs in `Property.images`.
- [ ] Extend inquiry filters/serializers if needed for admin views.
- [ ] Optional: add refresh-token endpoint and document it for frontend (e.g. `POST /api/auth/token/refresh` with SimpleJWT).
- [ ] Data migration: if migrating from existing MySQL, write a script that maps old tables (users, properties, inquiries) to Django models and run it once.
