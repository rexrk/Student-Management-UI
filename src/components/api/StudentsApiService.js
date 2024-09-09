import { apiClient } from "./ApiClient";

export const deleteStudentApi = (username, id) => apiClient.delete(`/students/${username}/${id}`);

export const retrieveStudentApi = (username, id) => apiClient.get(`/students/${username}/${id}`);
export const retrieveStudentWithNameApi = (username) => apiClient.get(`/students/${username}`);

export const updateStudentApi = (username, id, student) => apiClient.put(`/students/${username}/${id}`, student);
