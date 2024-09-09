import HeaderComponent from "./HeaderComponent";
import WelcomeComponent from "./WelcomeComponent";
import StudentManageComponent from "./StudentManageComponent";
import StudentViewComponent from "./StudentViewComponent";
import ErrorComponent from "./ErrorComponent";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { useAuth } from "./security/AuthContext";

import "./style/StudentApp.css";
import StudentEditComponent from "./StudentEditComponent";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAuthenticated) return children;
  else return <Navigate to="/" />;
}

export default function StudentApp() {
  return (
    <div className="StudentApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<StudentManageComponent />} />

            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <WelcomeComponent />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/my-account/:id"
              element={
                <AuthenticatedRoute>
                  <StudentViewComponent />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/edit/:username/:id"
              element={
                <AuthenticatedRoute>
                  <StudentEditComponent />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <LogoutComponent />
                </AuthenticatedRoute>
              }
            />

            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
