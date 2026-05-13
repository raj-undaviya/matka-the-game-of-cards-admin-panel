import { Bell, HelpCircle, Menu, Search, Settings } from "lucide-react";

export function AdminTopbar({ setOpen }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="h-17.5 px-4 md:px-6 flex items-center gap-4">

        {/* Mobile Menu */}
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden shrink-0 text-gray-600"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Search Box */}
        <div className="relative flex-1 min-w-0">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2
            h-4 w-4 text-gray-400"
          />

          <input type="text" placeholder="Search platform..."
            className="w-full h-11 rounded-lg border border-gray-200 bg-[#f8fafc] pl-11 pr-4 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition
              focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1 sm:gap-2">

          {/* Icons */}
          <button className="h-10 w-10 rounded-lg grid place-items-center text-gray-500 hover:bg-gray-100 transition"
          >
            <Bell className="h-5 w-5" />
          </button>

          <button className="h-10 w-10 rounded-lg grid place-items-center text-gray-500 hover:bg-gray-100 transition"
          >
            <HelpCircle className="h-5 w-5" />
          </button>

          <button className="h-10 w-10 rounded-lg grid place-items-center text-gray-500 hover:bg-gray-100 transition"
          >
            <Settings className="h-5 w-5" />
          </button>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-gray-200 mx-2" />

          {/* Brand */}
          <div className="hidden sm:block text-lg font-bold text-emerald-600 whitespace-nowrap">
            Gaming Platform
          </div>
        </div>
      </div>
    </header>
  );
}