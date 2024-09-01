import { apiClient } from "./ApiClient";

export const retrieveAllStudentsApi = () => apiClient.get(`/students/all`);

export const deleteStudentApi = (id) => apiClient.delete(`/students/${id}`);

//to use
export const retrieveStudentApi = (id) => apiClient.get(`/students/${id}`);

export const updateStudentApi = (id, student) => apiClient.put(`/students/${id}`, student);

export const createStudentApi = (student) => apiClient.post(`/students`, student);