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

      <div className="flex flex-1 flex-col min-w-0">
        {/* applied lg for topbar work with responsive also */}
        <div className="lg:ml-64 ">
          <AdminTopbar setOpen={setOpen} />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
