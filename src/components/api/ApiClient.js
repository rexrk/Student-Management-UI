import axios from "axios";

const baseURL = process.env.NODE_ENV === 'production' 
  ? "http://student-springboot-app:8080"  // in kubernetes deployment
  : "http://localhost:8080";

export const apiClient = axios.create({
  baseURL,
});
