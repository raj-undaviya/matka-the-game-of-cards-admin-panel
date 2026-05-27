import { useState } from "react";
import { Bell, HelpCircle, Menu, Settings } from "lucide-react";
import TopbarSearch from "@/components/Navbar/TopbarSearch";
import NotificationMenu from "@/components/Navbar/NotificationMenu";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "@/context/AuthContext";

export function AdminTopbar({ setOpen }) {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const { user } = useAuth();

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        backgroundColor: searchExpanded ? "rgba(255, 255, 255, 0.85)" : "var(--background-color)",
        borderBottom: "1px solid var(--border-color)",
        backdropFilter: searchExpanded ? "blur(12px)" : undefined,
        WebkitBackdropFilter: searchExpanded ? "blur(12px)" : undefined,
      }}
    >
      <div className="relative h-16 px-4 md:px-6 flex items-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`lg:hidden shrink-0 transition-all duration-300 ${searchExpanded ? "max-md:opacity-0 max-md:w-0 max-md:overflow-hidden max-md:pointer-events-none" : ""
            }`}
          style={{ color: "var(--text-light-color)" }}
        >
          <Menu className="h-6 w-6" />
        </button>

        <TopbarSearch onExpandedChange={setSearchExpanded} />

        <div
          className={`flex items-center gap-1 sm:gap-2 shrink-0 transition-all duration-300 ${searchExpanded
            ? "max-md:opacity-0 max-md:w-0 max-md:overflow-hidden max-md:pointer-events-none"
            : ""
            }`}
        >
          <NotificationMenu />

          <button
            type="button"
            className="h-10 w-10 rounded-lg grid place-items-center transition-default"
            style={{ color: "var(--text-light-color)" }}
          >
            <Settings className="h-5 w-5" />
          </button>

          <div
            className="hidden sm:block h-6 w-px mx-1 sm:mx-2"
            style={{ backgroundColor: "var(--border-color)" }}
          />

          {/* Profile Dropdown — inline in the topbar */}
          <ProfileDropdown />

        </div>
      </div>
    </header>
  );
}
