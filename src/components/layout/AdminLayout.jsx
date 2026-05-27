import { Outlet } from "react-router-dom";
import { AdminSidebar } from "@/components/Navbar/AdminSidebar";
import { AdminTopbar } from "@/components/Navbar/AdminTopbar";

export default function AdminLayout({ open, setOpen }) {
  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: "var(--background-light-color)" }}
    >
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* Main content area — offset by sidebar width on lg+ screens */}
      <div className="flex flex-1 flex-col min-w-0 lg:ml-64">
        <AdminTopbar setOpen={setOpen} />
        <Outlet />
      </div>
    </div>
  );
}
