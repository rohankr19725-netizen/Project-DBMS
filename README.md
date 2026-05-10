# 🚀 UniStation — Campus Marketplace Platform

UniStation is a modern full-stack web application designed to simplify buying and selling within a college campus ecosystem. Built as part of a DBMS academic project, the platform enables students to securely post listings, browse products, and interact through a scalable and responsive system.

---

## 🌟 Features

- 🔐 Secure JWT-based Authentication
- 🛒 Buy & Sell Marketplace System
- 📦 Product Listings & Management
- ⚡ Responsive Modern UI
- 🔎 Browse & Explore Listings
- 🗂 CRUD Operations
- ☁️ MongoDB Database Integration
- 🔗 REST API Architecture

---

## 🧠 Project Overview

UniStation demonstrates the integration of frontend, backend, and database systems into a real-world marketplace platform.

The project focuses on:
- Database modeling
- Backend API development
- Authentication & authorization
- Full-stack workflow
- Client-server communication
- Scalable application structure

---

# 🛠 Tech Stack

## Frontend
- React.js
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Tools & Platforms
- Git & GitHub
- MongoDB Atlas
- Postman
- Vercel / Netlify
- Render

---

# 📂 Project Structure

```bash
UniStation/
│
├── frontend/              # React + Vite Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/               # Node.js + Express Backend
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   ├── package.json
│   └── index.js
│
├── .gitignore
└── README.md
```

---

# ⚙️ Getting Started

## 🔹 Prerequisites

Make sure you have installed:

- Node.js (LTS Version)
- npm
- MongoDB (Local or Atlas)

---

# 📥 Clone Repository

```bash
git clone https://github.com/rohan-k-dev/unistation-campus-marketplace.git

cd unistation-campus-marketplace
```

---

# 💻 Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:8080
```

---

# ⚙️ Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# 🔐 Authentication

- JWT-based Authentication
- Secure Login & Signup Flow
- Protected Backend Routes
- Token Validation Middleware

---

# 📡 Sample API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/listings` | Fetch all listings |
| POST | `/api/listings` | Create new listing |

---

# 🚀 Available Scripts

## Frontend

```bash
npm run dev
npm run build
npm run preview
```

## Backend

```bash
npm run dev
npm start
```

---

# 🌍 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel / Netlify |
| Backend | Render |
| Database | MongoDB Atlas |

---

# 🛠 Common Issues & Fixes

### npm install error

```bash
Invalid tag name "#"
```

✅ Ensure there are no comments (`#`) inside `package.json`.

---

### MongoDB Connection Failure

✅ Verify:
- MongoDB URI
- Atlas Network Access
- Database Credentials

---

# 🎓 Academic Relevance

This project was developed as part of a DBMS course curriculum focusing on:

- Database Design
- API Development
- Full-Stack Integration
- Backend Architecture
- CRUD Operations
- Authentication Systems

---

# 👨‍💻 Author

## Rohan Kumar

- GitHub: https://github.com/rohan-k-dev
- LinkedIn: https://www.linkedin.com/in/rohan19725

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!
