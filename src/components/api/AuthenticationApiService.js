import { apiClient } from "./ApiClient";

export const executeJwtAuthenticationService = (username, password) =>
  apiClient.post(`/authenticate`, { username, password });

export const createStudentApi = (student) => apiClient.post(`/register`, student);