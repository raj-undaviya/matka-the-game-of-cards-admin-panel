import { LayoutGrid, Users, Gamepad2, Dice5, ShieldAlert, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const nav = [
    { path: "/admin/overview", label: "Overview", icon: LayoutGrid },
    { path: "/admin/users", label: "Users", icon: Users },
    { path: "/admin/games", label: "Games", icon: Gamepad2 },
    { path: "/admin/jackpot", label: "Jackpot", icon: Dice5 },
    { path: "/admin/risk", label: "Risk Management", icon: ShieldAlert },
];

export function AdminSidebar({ open, setOpen }) {
    return (
        <>
            {/* Mobile Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 lg:hidden"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static z-50 top-0 left-0 min-h-screen w-64 flex flex-col transition-default
                ${open
                    ? "translate-x-0"
                    : "-translate-x-full"
                } lg:translate-x-0`}
                style={{
                    backgroundColor: "var(--background-color)",
                    border: "1px solid var(--border-color)",
                }}
            >

                {/* Logo */}
                <div className="px-6 py-5 flex items-center justify-between"
                    style={{ borderBottom: "1px solid var(--border-color)" }}
                >

                    <div>
                        <h1 className="text-lg font-bold"
                            style={{ color: "var(--text-color)" }}
                        >
                            AdminConsole
                        </h1>

                        <p className="text-xs"
                            style={{ color: "var(--text-light-color)" }}
                        >
                            Platform Management
                        </p>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={() => setOpen(false)}
                        className="lg:hidden"
                    >
                        <X className="h-5 w-5"
                            style={{ color: "var(--text-color)" }}
                        />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-5 space-y-1">

                    {nav.map(
                        ({
                            path,
                            label,
                            icon: Icon,
                        }) => (
                            <NavLink
                                key={path}
                                to={path}
                                onClick={() =>
                                    setOpen(false)
                                }
                                className={({ isActive,
                                }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-default`
                                }
                                style={({ isActive }) => ({
                                    backgroundColor:
                                        isActive
                                            ? "var(--primary-light-color)"
                                            : "transparent",

                                    color: isActive
                                        ? "var(--primary-color)"
                                        : "var(--text-light-color)",

                                    borderRight: isActive
                                        ? `3px solid var(--primary-color)`
                                        : "3px solid transparent",
                                })}
                            >
                                <Icon className="h-4 w-4" />

                                {label}
                            </NavLink>
                        )
                    )}
                </nav>

                {/* Profile */}
                <div className="p-4 flex items-center gap-3"
                    style={{
                        borderTop: "1px solid var(--border-color)",
                    }}
                >

                    {/* Avatar */}
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                            backgroundColor: "var(--primary-light-color)",
                            color: "var(--primary-color)",
                        }}
                    >
                        SR
                    </div>

                    {/* User Info */}
                    <div>
                        <div className="text-sm font-semibold"
                            style={{ color: "var(--text-color)" }}
                        >
                            System Root
                        </div>

                        <div className="text-xs"
                            style={{ color: "var(--text-light-color)" }}
                        >
                            Super Admin
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}