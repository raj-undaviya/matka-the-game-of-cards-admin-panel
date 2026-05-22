import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminUsersPage from "@/pages/AdminUsersPage";
import AdminGamesPage from "@/pages/AdminGamesPage";
import AdminJackpotPage from "@/pages/AdminJackpotPage";
import AdminRiskPage from "@/pages/AdminRiskPage";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/overview" replace />} />

        <Route
          element={<AdminLayout open={open} setOpen={setOpen} />}
        >
          <Route path="/admin/overview" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/games" element={<AdminGamesPage />} />
          <Route path="/admin/jackpot" element={<AdminJackpotPage />} />
          <Route path="/admin/risk" element={<AdminRiskPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
