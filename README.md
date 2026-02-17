# Lagankhel Dental Clinic Website

A dental clinic website inspired by [House of Dentistry](https://houseofdentistry.in/), built with **React.js**, **PHP**, **MySQL**, and **JavaScript**.

## Features

- **React.js** frontend with modern UI
- **PHP** backend API for appointments and contact form
- **MySQL** database for storing appointments and messages
- Responsive design for mobile and desktop
- Sections: Hero, About, Why Choose Us, Services, Stats, Team, Gallery, Blog, Contact
- Book Appointment modal
- Contact form

## Project Structure

```
Lagankhel Dental Clinic/
├── frontend/          # React (Vite) application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   └── package.json
├── backend/           # PHP API
│   ├── api/
│   │   ├── appointments.php
│   │   └── contact.php
│   └── config/
│       └── db.php
├── database/
│   └── schema.sql     # MySQL schema
└── README.md
```

## Setup Instructions

### 1. Database Setup (MySQL)

1. Create a MySQL database and run the schema:

```bash
mysql -u root -p < database/schema.sql
```

2. Update database credentials in `backend/config/db.php`:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'lagankhel_dental');
define('DB_USER', 'root');
define('DB_PASS', 'your_password');
```

### 2. PHP Backend

Start a PHP development server from the **backend** folder:

```bash
cd backend
php -S localhost:8000
```

Or if using XAMPP/WAMP: Copy the `backend` folder to `htdocs` and update the API base URL in the frontend. Access PHP via `http://localhost/backend/api/`.

### 3. React Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will run at **http://localhost:3000**

The Vite dev server is configured to proxy `/api/*` requests to `http://localhost:8000/backend/api/*`. Ensure the PHP server is running on port 8000 for the appointment and contact forms to work.

### 4. Production Build

```bash
cd frontend
npm run build
```

The build output will be in `frontend/dist/`. You can deploy this to any static host. For the PHP API, deploy the `backend` folder to a PHP-capable server (Apache, Nginx+PHP-FPM).

## API Endpoints

### POST /api/appointments.php
Book an appointment.

**Body (JSON):**
```json
{
  "patient_name": "John Doe",
  "email": "john@example.com",
  "phone": "9800000000",
  "appointment_date": "2026-02-20",
  "appointment_time": "10:00 AM",
  "service": "General Checkup",
  "message": "Optional message"
}
```

### POST /api/contact.php
Send a contact message.

**Body (JSON):**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9800000000",
  "subject": "Enquiry",
  "message": "Your message here"
}
```

## Tech Stack

- **Frontend:** React 18, React Router, Vite
- **Backend:** PHP 7.4+
- **Database:** MySQL 5.7+
- **Styling:** Custom CSS (Playfair Display & Source Sans 3 fonts)

## Customization

- Update clinic name, address, phone numbers in `Footer.jsx`, `Contact.jsx`, and other components
- Replace placeholder images with your clinic photos
- Modify `backend/config/db.php` for your database credentials
