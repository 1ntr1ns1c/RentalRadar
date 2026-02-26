# RentalRadar 🏠📡

> A mobile-first, admin-controlled web platform for helping tenants discover vacant rental houses around them without walking door to door.

---

## 🚀 Project Overview
**RentalRadar** is a responsive web application built to streamline the house-hunting process for local tenants. It allows tenants to browse listings, filter by location and room count, and send inquiries to caretakers or admins. The system is admin-controlled, meaning only verified users can create or manage listings.

---

## 🧱 Tech Stack

### Frontend:
- **React** (with TypeScript)
- **Vite** (module bundler)
- **TailwindCSS** (utility-first styling)
- **Axios** (HTTP client)
- **React Hook Form** (form handling)
- **Zod/Yup** *(optional)* – validation

### Backend (Django):
- **Django 4.x** + **Django REST Framework** + **SimpleJWT**
- **PostgreSQL** (via `DATABASE_URL`)
- **django-environ**, **django-cors-headers**, **django-filter**, **django-ratelimit**

*(Legacy: Node.js + Express + MySQL is in `/backend`.)*

### Hosting & Tools:
- **Vercel** or **Netlify** (Frontend hosting)
- **Railway** or **Render** (Backend + DB hosting)
- **Cloudinary** (Image uploads)
- **Postman** (API testing)

---

## 🧩 Database Schema

### Users
|| Field      | Type                      | Notes                                   |
| ---------- | ------------------------- | --------------------------------------- |
| id         | Integer (auto-generate)   | Primary key, auto-incremented           |
| name       | String                    | Full name of the user                   |
| email      | String                    | Must be unique, used for login/identity |
| password   | String                    | Hashed password                         |
| phone      | String                    | Optional or required based on use case  |
| role       | Enum (`admin` / `tenant`) | Defines user access level               |
| created_at | Timestamp                 | Automatically set when user is created  |

### Property
| Field         | Type            | Notes                                              |
| ------------- | --------------- | -------------------------------------------------- |
| id            | Integer (PK)    | Auto-increment primary key                         |
| title         | String          | Max length: 200                                    |
| description   | Text            | Full description                                   |
| city          | String          | Which city                                         |
| neighbourhood | String          | Neighbourhood or local area                        |
| price         | Decimal(10,2)   | Rent amount                                        |
| bedrooms      | Integer         | Total of bedrooms                                  |
| bathrooms     | integer         | Number of bathrooms                                |
| images        | JSON / String[] | store image URLs                                   |
| is_available  | Boolean         | From `is_available`                                |
| created_by    | Integer (FK)    | Foreign key to Users table                         |
| created_at    | Timestamp       | Sequelize typically auto-generates this            |
| property_type | Enum            | apartment, house, condo, studio, bedsitter, single |

### Inquiries
| Field      | Type                                   | Notes                                             |
| ---------- | -------------------------------------- | ------------------------------------------------- |
| id         | Integer                                | Primary key, auto-incremented                     |
| listing_id | FK (Listing)                           | References the related property/listing           |
| tenant_id  | FK (User)                              | References the user (tenant) who made the inquiry |
| message    | Text                                   | The content of the inquiry message                |
| status     | Enum(`pending`, `viewed`, `responded`) | Tracks the inquiry's current state                |
| created_at | Timestamp                              | Timestamp of when the inquiry was created         |

---

## 🔐 Authentication Flow
- Users register or login and receive a JWT
- Token is stored on the client (e.g., localStorage)
- Protected endpoints are accessed via `Authorization: Bearer <token>`

---

## 📦 MVP Features

### Tenant:
- Register / Login
- View available listings
- Filter listings by location and room count
- Send inquiry message for a listing

### Admin:
- Secure login
- Add / edit / delete property listings
- View and respond to inquiries

---

## 🐍 Django backend (backend)

The primary backend is Django + DRF + PostgreSQL. Setup:

1. `cd backend` → copy `.env.example` to `.env`, set `DATABASE_URL` and `SECRET_KEY`.
2. `pip install -r requirements.txt` → `python manage.py migrate` → `python manage.py runserver`.
3. Optional: `python manage.py createsystemsuperuser --email admin@example.com --password YourPassword`.

**Frontend:** set `VITE_API_URL` to the Django API base (e.g. `http://localhost:8000/api`). The React app uses the same endpoints: `/api/auth/register`, `/api/auth/login`, `/api/properties`, `/api/inquiries`, etc. Login/register responses include `token` (access) and `refresh`; use `token` in `Authorization: Bearer <token>`.

See `backend/README.md` for full API table, Docker, and production notes.

---

## 🌍 Deployment Plan
| Component  | Platform     |
|------------|--------------|
| Frontend   | Vercel       |
| Backend    | Railway / any (Django + Postgres) |
| Database   | PostgreSQL   |
| Media      | Cloudinary   |

---

## 🔄 Future Enhancements
- Map integration (Google Maps or Leaflet)
- Save/favorite listings
- SMS or email notifications
- Progressive Web App (PWA) support
- Booking calendar

---

## 📝 License
This project is licensed under the MIT License.
