// api.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1", // change to your actual backend endpoint
  withCredentials: true, // if you're sending cookies/token across domains
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
