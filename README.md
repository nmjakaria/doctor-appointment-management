# DocAppoint - Doctor Appointment Manager

A modern, full-stack, and responsive Doctor Appointment Booking System built using Next.js for a robust client-side architecture and Node.js/Express.js powering the scalable server-side. The platform provides a seamless experience for searching medical specialists, managing reservations dynamically, updating profiles, and managing secure route access.

**Live Application URL:** [Insert Live Link Here]  
**Client Repository:** [GitHub Client Link](https://github.com/nmjakaria/doctor-appointment-management)  
**Server Repository:** [GitHub Server Link](https://github.com/nmjakaria/doctor-appointment-server)  

---

## 🚀 Key Features

* **Secure Authentication via Better Auth & JWT:** Powered by Better Auth combined with secure JSON Web Tokens (JWT) for production-ready session handling. User login states, ecosystem validation, and secure headers are strictly verified across public and protected route blocks.
* **Dynamic Protected Routes:** Implemented robust private routing structures. Authenticated users remain securely logged in and are never redirected back to the Login page when performing a browser refresh on any private dashboard route.
* **Dynamic Booking Management Dashboard:** A dedicated dashboard private route enabling authenticated users to track, update, or cancel personal healthcare reservations securely. The interactive update engine pre-fills current data in a modal form while strictly retaining data integrity on doctor profiles and email endpoints.
* **Smart Filtering & Global Search:** Search seamlessly on the All Appointments page using doctor names, alongside an advanced feature for sorting available listings to identify appropriate matching specialists instantly.
* **Interactive Responsive Interface:** Designed elegantly using **HeroUI** component structures with zero default browser alerts, opting for premium toast notifications instead. Interactivity is elevated via custom theme toggling (Light/Dark mode) and a smooth marquee track powered by `react-fast-marquee`.
* **Reliable App State & SEO Structure:** Configured with robust metadata tags across all private and public system routes to enhance search engine optimization and user navigation. 

---

## 🛠️ Technology Stack

### Client-Side
* **Framework:** Next.js (Single Page Architecture)
* **UI Component Library:** HeroUI
* **Styling:** Tailwind CSS (with Theme Toggle supporting native Dark Mode integration)
* **Animation & Motion:** `react-fast-marquee` (Medical Affiliations section)
* **Notifications:** Dynamic Toast messages / Structural Interactive Modals

### Server-Side
* **Runtime & Framework:** Node.js, Express.js
* **Database Management:** MongoDB & Mongoose
* **Authentication & Security:** Better Auth handling credential/social states paired with JSON Web Tokens (JWT) for secure API endpoint request header verification.

---

## ⚙️ Layout & Navigation Routes

* **Public Routes:**
  * `Home (/)` — Displays modern HeroUI banner, affiliated marquee partners, medical specialty grid, and top-rated doctor card highlights.
  * `All Appointments (/appointments)` — Accessible list with real-time search, sorting, and details mapping.
  * `Doctor Details (/appointments/:id)` — Deep profile view detailing fees, schedule slots, and optional patient review inputs.
  * `Authentication (/login, /register)` — Strict validation inputs ensuring users conform to security policies (1 uppercase, 1 lowercase, 6 characters minimum).

* **Private Routes (JWT Dashboard Protection):**
  * `My Bookings (/dashboard/bookings)` — Full monitoring board featuring asynchronous MongoDB Update/Delete actions that update the UI immediately without requiring a browser refresh.
  * `My Profile (/dashboard/profile)` — Instant profile parameter updater (Name, Photo URL) maintaining instant client UI context.

---

## 🛠️ Local Development Installation

Follow these steps to configure a local instance of the application:

### 1. Clone the Repositories

**docappoint-client**
```bash
git clone https://github.com/nmjakaria/doctor-appointment-management.git

```

**docappoint-server**

```bash
git clone https://github.com/nmjakaria/doctor-appointment-server.git
```

### 2. Client Setup

```bash
cd docappoint-client
npm install
npm run dev

```

*Configure a `.env` file containing your corresponding backend API URL and Better Auth endpoint paths:*

### 3. Server Setup

```bash
cd docappoint-server
npm install
npm start

```
*Configure your backend `.env` variables to link your storage instances securely:*
