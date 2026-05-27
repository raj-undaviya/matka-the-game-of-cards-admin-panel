import { useEffect, useRef, useState } from "react";
import {
    Settings,
    Shield,
    KeyRound,
    ClipboardList,
    LogOut,
    ChevronDown,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import useClickOutside from "@/hooks/useClickOutside";

export default function ProfileDropdown() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
    const { user, logout } = useAuth();

    useClickOutside(dropdownRef, () => setOpen(false));

    // Lock body scroll on mobile when dropdown is open
    useEffect(() => {
        if (open) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        };
    }, [open]);

    const menuItems = [
        {
            icon: <Settings size={16} />,
            label: "Profile Settings",
        },
        {
            icon: <Shield size={16} />,
            label: "Security & 2FA",
        },
        {
            icon: <KeyRound size={16} />,
            label: "API Keys",
        },
        {
            icon: <ClipboardList size={16} />,
            label: "Audit Logs",
        },
    ];

    // Helper for rendering initials
    const getInitials = (name) => {
        if (!name) return "AU";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className="relative" ref={dropdownRef}>

            {/* Profile Trigger Button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 sm:gap-3 transition-default rounded-lg px-2 py-1.5 hover:bg-slate-50 cursor-pointer"
                aria-expanded={open}
                aria-haspopup="true"
            >
                {/* Avatar */}
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 border-2 border-emerald-500 shadow-md transition-all hover:scale-105"
                    style={{
                        backgroundColor: "var(--primary-light-color)",
                        color: "var(--primary-color)",
                    }}
                >
                    {user?.avatar || getInitials(user?.name)}
                </div>

                {/* User name — hidden on very small screens */}
                <div className="text-left hidden sm:block">
                    <h3 className="text-xs font-semibold leading-tight"
                        style={{
                            color: "var(--text-color)",
                        }}
                    >
                        {user?.name || "Admin User"}
                    </h3>

                    <p className="text-[10px]"
                        style={{
                            color: "var(--text-light-color)",
                        }}
                    >
                        {user?.role || "Super Admin"}
                    </p>
                </div>

                <ChevronDown
                    size={14}
                    className={`hidden sm:block transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    style={{ color: "var(--text-light-color)" }}
                />
            </button>

            {/* Mobile backdrop overlay */}
            {open && (
                <div
                    className="sm:hidden fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px]"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Dropdown Panel */}
            {open && (
                <div
                    className={`
                        z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden
                        fixed sm:absolute
                        inset-x-3 bottom-3 top-auto
                        sm:inset-auto sm:right-0 sm:top-full sm:mt-4
                        w-auto sm:w-[320px] md:w-[350px]
                        max-h-[calc(100vh-6rem)] overflow-y-auto
                        animate-in fade-in zoom-in duration-200
                    `}
                >

                    {/* Header */}
                    <div className="p-5 sm:p-6">

                        <p className="text-xs font-bold tracking-widest uppercase mb-4 text-slate-400">
                            Account Details
                        </p>

                        <div className="flex items-center gap-3 sm:gap-4">

                            {/* Avatar */}
                            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center text-lg sm:text-xl font-bold shrink-0 border border-emerald-100 shadow-sm"
                                style={{
                                    backgroundColor: "var(--primary-light-color)",
                                    color: "var(--primary-color)",
                                }}
                            >
                                {user?.avatar || getInitials(user?.name)}
                            </div>

                            {/* Info */}
                            <div className="min-w-0">

                                <h3 className="text-base sm:text-lg font-bold truncate text-slate-800">
                                    {user?.name || "Admin User"}
                                </h3>

                                <p className="text-xs text-slate-500 truncate mt-0.5">
                                    {user?.email || "admin@matkaking.com"}
                                </p>

                                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 mt-1.5 uppercase">
                                    {user?.role || "Super Admin"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="px-2 sm:px-3 pb-2 sm:pb-3">

                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                className="w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-default hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                            >

                                <div
                                    style={{
                                        color: "var(--text-light-color)",
                                    }}
                                >
                                    {item.icon}
                                </div>

                                <span className="text-sm font-medium"
                                    style={{
                                        color: "var(--text-color)",
                                    }}
                                >
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="mx-4 sm:mx-6 h-px"
                        style={{
                            backgroundColor: "var(--border-color)",
                        }}
                    />

                    {/* Logout */}
                    <div className="p-2 sm:p-3">
                        <button
                            onClick={() => {
                                setOpen(false);
                                logout();
                            }}
                            className="w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-default hover:bg-rose-50 text-red-500 hover:text-rose-700 cursor-pointer"
                        >

                            <LogOut size={18} className="text-red-500 shrink-0" />

                            <span className="text-sm font-semibold">
                                Sign Out
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}