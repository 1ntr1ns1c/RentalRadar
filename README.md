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

### Backend:
- **Node.js + Express.js**
- **MySQL** (Relational DB)
- **JWT** (Authentication)
- **bcryptjs** (Password hashing)
- **dotenv** (Environment management)

### Hosting & Tools:
- **Vercel** or **Netlify** (Frontend hosting)
- **Railway** or **Render** (Backend + DB hosting)
- **Cloudinary** (Image uploads)
- **Postman** (API testing)

---

## 🧩 Database Schema

### Users
| Field     | Type    |
|-----------|---------|
| id        | Integer |
| name      | String  |
| email     | String  |
| password  | String  |
| phone     | String  |
| role      | Enum (`admin` / `tenant`) |
| created_at | Timestamp |

### Listings
| Field        | Type    |
|--------------|---------|
| id           | Integer |
| title        | String  |
| description  | Text    |
| location     | String  |
| price        | Decimal |
| rooms        | Integer |
| images       | JSON/String[] |
| is_available | Boolean |
| created_by   | FK (User) |
| created_at   | Timestamp |

### Inquiries
| Field      | Type    |
|------------|---------|
| id         | Integer |
| listing_id | FK (Listing) |
| tenant_id  | FK (User) |
| message    | Text    |
| status     | Enum(`pending`, `viewed`, `responded`) |
| created_at | Timestamp |

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

## 🌍 Deployment Plan
| Component  | Platform     |
|------------|--------------|
| Frontend   | Vercel / Netlify |
| Backend    | Railway / Render |
| Database   | Hosted MySQL or PlanetScale |
| Media      | Cloudinary |

---

## 🔄 Future Enhancements
- Map integration (Google Maps or Leaflet)
- Save/favorite listings
- SMS or email notifications
- Progressive Web App (PWA) support
- Booking calendar

---

## 🧠 Author
**Isaac Ferdinand**  
Full-stack Developer  
[LinkedIn](#) | [Portfolio](#)

---

## 📝 License
This project is licensed under the MIT License.
