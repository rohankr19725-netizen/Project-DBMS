// Centralized API base URL configuration
// In production, set VITE_BACKEND_URL in Vercel environment variables
// Example: VITE_BACKEND_URL=https://your-app.onrender.com

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default API_BASE_URL;
