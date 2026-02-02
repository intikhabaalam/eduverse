import axios from "axios";

// Dynamic API URL
const API_URL = import.meta.env.PROD
  ? "/api/auth/"                  // Production = same port
  : "http://localhost:5000/api/auth/";  // Dev = separate port

// Register user
const register = async (formData) => {
  const response = await axios.post(`${API_URL}register`, formData, {
    headers: { "Content-Type": "application/json" }
  });
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

// Login user
const login = async (formData) => {
  const response = await axios.post(`${API_URL}login`, formData, {
    headers: { "Content-Type": "application/json" }
  });
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

// Export
const authService = { register, login };
export default authService;