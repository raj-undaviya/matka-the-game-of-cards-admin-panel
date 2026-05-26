import { LayoutGrid, Users, Gamepad2, Dice5, ShieldAlert, FileText, X, Server, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const nav = [
  { path: "/admin/overview", label: "Overview", icon: LayoutGrid },
  { path: "/admin/users", label: "Users", icon: Users },
  { path: "/admin/games", label: "Games", icon: Gamepad2 },
  { path: "/admin/jackpot", label: "Jackpot", icon: Dice5 },
  { path: "/admin/risk", label: "Risk Management", icon: ShieldAlert },
  { path: "/admin/policies", label: "Policies & Compliance", icon: FileText },
];

export function AdminSidebar({ open, setOpen }) {
  const { user, logout } = useAuth();

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        />
      )}

      <aside
        className={`fixed z-50 top-0 left-0 h-screen w-64 flex flex-col transition-all duration-300 ${open ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        style={{
          backgroundColor: "var(--background-color)",
          border: "1px solid var(--border-color)",
        }}
      >
        <div
          className="px-6 py-5 flex items-center justify-between"
          style={{ borderBottom: "1px solid var(--border-color)" }}
        >
          <div>
            <h1 className="text-lg font-bold" style={{ color: "var(--text-color)" }}>
              AdminConsole
            </h1>
            <p className="text-xs" style={{ color: "var(--text-light-color)" }}>
              Platform Management
            </p>
          </div>

          <button onClick={() => setOpen(false)} className="lg:hidden" type="button">
            <X className="h-5 w-5" style={{ color: "var(--text-color)" }} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {nav.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-default"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "var(--primary-light-color)" : "transparent",
                color: isActive ? "var(--primary-color)" : "var(--text-light-color)",
                borderRight: isActive ? "3px solid var(--primary-color)" : "3px solid transparent",
              })}
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 flex items-center justify-between border-t" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{
                backgroundColor: "var(--primary-light-color)",
                color: "var(--primary-color)",
              }}
            >
              {user?.avatar || "AU"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: "var(--text-color)" }}>
                {user?.name || "Admin User"}
              </p>
              <p className="text-xs truncate" style={{ color: "var(--text-light-color)" }}>
                {user?.role || "Super Admin"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="h-8 w-8 rounded-lg grid place-items-center hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        <div className="px-4 pb-4">
          <div
            className="rounded-xl border p-4"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--background-light-color)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Server size={16} style={{ color: "var(--primary-color)" }} />
              <span
                className="text-xs font-bold uppercase tracking-wide"
                style={{ color: "var(--text-light-color)" }}
              >
                Server Status
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--primary-color)" }}
              />
              <span className="text-sm font-medium" style={{ color: "var(--primary-color)" }}>
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
