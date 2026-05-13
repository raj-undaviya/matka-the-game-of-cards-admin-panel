import { LayoutGrid, Users, Gamepad2, Dice5, ShieldAlert, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const nav = [
    {
        path: "/admin/overview",
        label: "Overview",
        icon: LayoutGrid,
    },
    {
        path: "/admin/users",
        label: "Users",
        icon: Users,
    },
    {
        path: "/admin/games",
        label: "Games",
        icon: Gamepad2,
    },
    {
        path: "/admin/jackpot",
        label: "Jackpot",
        icon: Dice5,
    },
    {
        path: "/admin/risk",
        label: "Risk Management",
        icon: ShieldAlert,
    },
];

export function AdminSidebar({ open, setOpen }) {
    return (
        <>
            {/* Mobile Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
            )}

            <aside className={`fixed lg:static z-50 top-0 left-0 h-screen w-64 bg-white border border-gray-200 flex flex-col transition-transform duration-300
                ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                {/* Logo */}
                <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-bold text-black">
                            AdminConsole
                        </h1>

                        <p className="text-xs text-gray-500">
                            Platform Management
                        </p>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-5 space-y-1">
                    {nav.map(({ path, label, icon: Icon }) => (
                        <NavLink
                            key={path}
                            to={path}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                    ? "bg-emerald-50 text-emerald-600 border-r-2 border-emerald-500"
                                    : "text-gray-500 hover:bg-gray-100 hover:text-black"
                                }`
                            }
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Profile */}
                <div className="p-4 border-t border-gray-200 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                        SR
                    </div>

                    <div>
                        <div className="text-sm font-semibold">
                            System Root
                        </div>

                        <div className="text-xs text-gray-500">
                            Super Admin
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}