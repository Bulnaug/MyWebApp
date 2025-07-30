import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";
import GuestRoute from "./auth/GuestRoute";
import { Link } from "react-router-dom";


import BoardsPage from "./pages/BoardsPage";
import BoardPage from "./pages/BoardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LogoutButton from "./components/LogoutButton";
import LoginPanel from "./components/LoginButton";

import { BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";


export default function App() {
  return (
    <div>
      <AuthProvider>
            <BrowserRouter>
              <Routes>
                
                <Route path="/" element={
                  <ProtectedRoute>
                    <BoardsPage />
                    <LogoutButton />
                  </ProtectedRoute>
                  
                } />

                <Route path="/board/:id" element={
                  <ProtectedRoute>
                    <BoardPage />
                  </ProtectedRoute>
                } />
              </Routes>
            </BrowserRouter>
            <BrowserRouter>
              <Routes>
                
                <Route path="/" element={
                  <GuestRoute>
                    <Homepage />
                    <LoginPanel />
                  </GuestRoute>

                } />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                
              </Routes>
            </BrowserRouter>
          </AuthProvider>
    </div>
  );
}