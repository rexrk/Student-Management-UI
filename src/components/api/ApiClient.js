import axios from "axios";

export const apiClient = axios.create({
  baseURL : "http://104.197.67.1:8080"
});