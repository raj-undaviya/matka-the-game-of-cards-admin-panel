import { Bell, HelpCircle, Menu, Search, Settings } from "lucide-react";

export function AdminTopbar({ setOpen }) {
  return (
    <header className="sticky top-0 z-30"
      style={{
        backgroundColor: "var(--background-color)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >

      <div className="h-17.5 px-4 md:px-6 flex items-center gap-4">

        {/* Mobile Menu */}
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden shrink-0"
          style={{
            color: "var(--text-light-color)",
          }}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Search Box */}
        <div className="relative flex-1 min-w-0">

          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{
              color: "var(--text-light-color)",
            }}
          />

          <input
            type="text"
            placeholder="Search platform..."
            className="w-full h-11 rounded-lg pl-11 pr-4 text-sm outline-none transition-default"
            style={{
              backgroundColor:
                "var(--background-light-color)",

              border:
                "1px solid var(--border-color)",

              color:
                "var(--text-color)",
            }}
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1 sm:gap-2">

          {/* Bell */}
          <button className="h-10 w-10 rounded-lg grid place-items-center transition-default"
            style={{ color: "var(--text-light-color)" }}
          >
            <Bell className="h-5 w-5" />
          </button>

          {/* Help */}
          <button className="h-10 w-10 rounded-lg grid place-items-center transition-default"
            style={{ color: "var(--text-light-color)" }}
          >
            <HelpCircle className="h-5 w-5" />
          </button>

          {/* Settings */}
          <button
            className="h-10 w-10 rounded-lg grid place-items-center transition-default"
            style={{
              color: "var(--text-light-color)",
            }}
          >
            <Settings className="h-5 w-5" />
          </button>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px mx-2"
            style={{
              backgroundColor: "var(--border-color)",
            }}
          />

          {/* Brand */}
          <div className="hidden sm:block text-lg font-bold whitespace-nowrap"
            style={{
              color: "var(--primary-color)",
            }}
          >
            Gaming Platform
          </div>
        </div>
      </div>
    </header>
  );
}