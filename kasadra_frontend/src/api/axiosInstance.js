import axios from "axios";

const BASE_URL = window._env_?.VITE_API_URL || import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
 withCredentials: false,
});

// Add token automatically if present
api.interceptors.request.use((config) => {
  const role = config.headers["X-Role"]; // 👈 read role from request

  if (role === "student") {
    const token = localStorage.getItem("studentToken");
    // console.log("stoken", token);
    
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }

  if (role === "instructor") {
    const token = localStorage.getItem("instructorToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Global error handler
api.interceptors.response.use(
  (response) => {
    // If backend accidentally sends HTML instead of JSON
    if (typeof response.data === "string" && response.data.includes("<!DOCTYPE html>")) {
      return Promise.reject({ message: "Server is not available. Please try again later." });
    }
    return response;
  },
  (error) => {
    if (!error.response) {
      // No response (server down, CORS issue, network error)
      return Promise.reject({ message: "Unable to connect to server. Please try again later." });
    }
    return Promise.reject(error);
  }
);

export default api;
