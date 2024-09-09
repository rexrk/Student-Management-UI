import { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { retrieveStudentWithNameApi } from "../api/StudentsApiService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [token, setToken] = useState(null);

  async function getStudent(username) {
    try {
      const res = await retrieveStudentWithNameApi(username);
      setId(res.data.id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function login(username, password) {
    try {
      const response = await executeJwtAuthenticationService(username, password);

      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.token;

        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = jwtToken;
          return config;
        });

        await getStudent(username);

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.log(error);
      logout();
      return false;
    }
  }

  useEffect(() => {}, [id]);

  function logout() {
    setAuthenticated(false);
    setToken(null);
    setUsername(null);
    setId(null);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, username, id, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
