// src/axios.js
import axios from "axios";

// Set the base URL for your API
axios.defaults.baseURL = "http://localhost:3000/api";

// Set the Authorization header with the token from localStorage
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

// Export the configured axios instance
export default axios;
