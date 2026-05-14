import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import { AdminSidebar } from "@/components/Navbar/AdminSidebar";
import { AdminTopbar } from "@/components/Navbar/AdminTopBar";
import AdminDashboardPage from "@/pages/AdminDashboardPage";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex bg-[#f5f7fb] min-h-screen">

        <AdminSidebar
          open={open}
          setOpen={setOpen}
        />

        <div className="flex-1 flex flex-col md:ml-0">

          <AdminTopbar setOpen={setOpen} />

          <main className="p-4 md:p-6">
            <Routes>

              <Route path="/" element={<Navigate to="/admin/overview" />} />

              <Route
                path="/admin/overview"
                element={<AdminDashboardPage />}
              />

            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;