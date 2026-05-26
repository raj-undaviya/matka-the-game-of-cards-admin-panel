import { useState } from "react";
import { Bell, HelpCircle, Menu, Settings } from "lucide-react";
import TopbarSearch from "@/components/Navbar/TopbarSearch";
import { useAuth } from "@/context/AuthContext";

export function AdminTopbar({ setOpen }) {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const { user } = useAuth();

  return (
    <header
      className="sticky top-0 z-30"
      style={{
        backgroundColor: searchExpanded ? "rgba(255, 255, 255, 0.85)" : "var(--background-color)",
        borderBottom: "1px solid var(--border-color)",
        backdropFilter: searchExpanded ? "blur(12px)" : undefined,
        WebkitBackdropFilter: searchExpanded ? "blur(12px)" : undefined,
      }}
    >
      <div className="relative h-17.5 px-4 md:px-6 flex items-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`lg:hidden shrink-0 transition-all duration-300 ${
            searchExpanded ? "max-md:opacity-0 max-md:w-0 max-md:overflow-hidden max-md:pointer-events-none" : ""
          }`}
          style={{ color: "var(--text-light-color)" }}
        >
          <Menu className="h-6 w-6" />
        </button>

        <TopbarSearch onExpandedChange={setSearchExpanded} />

        <div
          className={`flex items-center gap-1 sm:gap-2 shrink-0 transition-all duration-300 ${
            searchExpanded
              ? "max-md:opacity-0 max-md:w-0 max-md:overflow-hidden max-md:pointer-events-none"
              : ""
          }`}
        >
          <button
            type="button"
            className="h-10 w-10 rounded-lg grid place-items-center transition-default"
            style={{ color: "var(--text-light-color)" }}
          >
            <Bell className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="h-10 w-10 rounded-lg grid place-items-center transition-default"
            style={{ color: "var(--text-light-color)" }}
          >
            <HelpCircle className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="h-10 w-10 rounded-lg grid place-items-center transition-default"
            style={{ color: "var(--text-light-color)" }}
          >
            <Settings className="h-5 w-5" />
          </button>

          <div
            className="hidden sm:block h-6 w-px mx-2"
            style={{ backgroundColor: "var(--border-color)" }}
          />

          <div className="hidden sm:flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold leading-tight" style={{ color: "var(--text-color)" }}>
                {user?.name || "Admin User"}
              </p>
              <p
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: "var(--text-light-color)" }}
              >
                {user?.role || "Super Admin"}
              </p>
            </div>
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold overflow-hidden"
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "#fff",
              }}
            >
              {user?.avatar || "AU"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
