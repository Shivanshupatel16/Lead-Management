import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LeadsPage from "./pages/LeadsPage";
import SettingsPage from "./pages/SettingsPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthInitializer from "./components/AuthInitializer";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <AuthInitializer />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {user && <Navbar />}

        <Routes>
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
               </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
          />
          <Route
            path="/leads"
            element={
              <ProtectedRoute>
                <LeadsPage />
                </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
    
            }
          />
           <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Toaster position="top-right" theme="light" expand={false} richColors closeButton />
      </div>
    </Router>
  );
}

export default App;