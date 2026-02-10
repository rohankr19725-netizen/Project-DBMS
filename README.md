# UniStation – Full Stack DBMS Project

UniStation is a full-stack web application built as part of a DBMS academic project.  
It provides a platform where users can authenticate, browse listings, and post data through a modern, responsive UI backed by a scalable backend and database.

---

## 🔹 Project Overview

UniStation demonstrates the integration of a modern frontend with a backend API and a database.  
The project focuses on real-world concepts such as authentication, CRUD operations, database modeling, and API communication.

---

## 📂 Project Structure

roject-DBMS/
│
├── frontend/ # React + Vite frontend
││ ├── src/
││ ├── public/
││ ├── package.json
││ └── vite.config.ts
│
├── backend/ # Node.js + Express backend
││ ├── routes/
││ ├── models/
││ ├── controllers/
││ ├── package.json
││ └── index.js
│
├── .gitignore
└── README.md


---

## ⚙️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Tools & Platforms
- Git & GitHub
- MongoDB Atlas
- Postman (API testing)

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js (LTS)
- npm
- MongoDB (local or Atlas)

---

### 🔹 Clone the Repository
```bash
git clone https://github.com/rohankr19725-netizen/Project-DBMS.git
cd Project-DBMS


cd frontend
npm install
npm run dev


http://localhost:8080


cd backend
npm install
npm run dev


http://localhost:5000


PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key



🔐 Authentication

User authentication handled using JWT

Secure login and signup flow

Protected routes on backend




📡 API Endpoints (Sample)
Method	Endpoint	Description
POST	/api/auth/login	User login
POST	/api/auth/signup	User registration
GET	/api/listings	Fetch all listings
POST	/api/listings	Create new listing


Frontend
npm run dev
npm run build
npm run preview


Backend
npm run dev
npm start


🛠 Common Issues & Fixes

npm install error (Invalid tag name #)
→ Ensure there are no comments (#) inside package.json.

MongoDB connection fails
→ Verify MongoDB URI and network access in Atlas.


🌍 Deployment

Frontend: Vercel / Netlify

Backend: Render

Database: MongoDB Atlas



🎓 Academic Relevance

This project was developed as part of a DBMS course, focusing on:

Database design

Backend API development

Frontend integration

Full-stack workflow



👨‍💻 Author

Rohan Kumar
GitHub: https://github.com/rohankr19725-netizen







