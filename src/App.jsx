import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminUsersPage from "@/pages/AdminUsersPage";
import AdminGamesPage from "@/pages/AdminGamesPage";
import AdminJackpotPage from "@/pages/AdminJackpotPage";
import AdminWalletPage from "@/pages/AdminWalletPage";
import AdminRiskPage from "@/pages/AdminRiskPage";
import AdminPoliciesPage from "@/pages/AdminPoliciesPage";
import LoginPage from "@/pages/LoginPage";
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  const [open, setOpen] = useState(false);
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Root Redirect to Overview */}
        <Route path="/" element={<Navigate to="/admin/overview" replace />} />

        {/* Protected Admin Console Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            element={<AdminLayout open={open} setOpen={setOpen} />}
          >
            <Route path="/admin/overview" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/games" element={<AdminGamesPage />} />
            <Route path="/admin/jackpot" element={<AdminJackpotPage />} />
            <Route path="/admin/wallet" element={<AdminWalletPage />} />
            <Route path="/admin/risk" element={<AdminRiskPage />} />
            <Route path="/admin/policies" element={<AdminPoliciesPage />} />
          </Route>
        </Route>

        {/* Catch-all redirect to home/login */}
        <Route path="*" element={<Navigate to="/admin/overview" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
