import { useEffect, useRef, useState } from "react";
import {
    Settings,
    Shield,
    KeyRound,
    ClipboardList,
    LogOut,
    ChevronDown,
} from "lucide-react";

export default function ProfileDropdown() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

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

    return (
        <div className="relative" ref={dropdownRef}>

            {/* Profile Trigger Button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 sm:gap-3 transition-default rounded-lg px-2 py-1.5 hover:bg-gray-50"
            >
                {/* Avatar */}
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                        backgroundColor: "var(--primary-light-color)",
                        color: "var(--primary-color)",
                    }}
                >
                    AS
                </div>

                {/* User name — hidden on very small screens */}
                <div className="text-left hidden sm:block">
                    <h3 className="text-xs font-semibold leading-tight"
                        style={{
                            color: "var(--text-color)",
                        }}
                    >
                        Akshita Sondagar
                    </h3>

                    <p className="text-[10px]"
                        style={{
                            color: "var(--text-light-color)",
                        }}
                    >
                        Super Admin
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
                    className="sm:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Dropdown Panel */}
            {open && (
                <div
                    className={`
                        z-50 rounded-2xl overflow-hidden glass-search glass-search--active shadow-2xl
                        fixed sm:absolute
                        inset-x-3 bottom-3 top-auto
                        sm:inset-auto sm:right-0 sm:top-full sm:mt-2
                        w-auto sm:w-[320px] md:w-[350px]
                        max-h-[calc(100vh-6rem)] overflow-y-auto
                    `}
                >

                    {/* Header */}
                    <div className="p-5 sm:p-6">

                        <p className="text-xs font-bold tracking-widest uppercase mb-4"
                            style={{
                                color: "var(--text-light-color)",
                            }}
                        >
                            Account
                        </p>

                        <div className="flex items-center gap-3 sm:gap-4">

                            {/* Avatar */}
                            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center text-lg sm:text-xl font-bold shrink-0"
                                style={{
                                    backgroundColor: "var(--primary-light-color)",
                                    color: "var(--primary-color)",
                                }}
                            >
                                AR
                            </div>

                            {/* Info */}
                            <div className="min-w-0">

                                <h3 className="text-lg sm:text-2xl font-semibold truncate"
                                    style={{
                                        color: "var(--text-color)",
                                    }}
                                >
                                    Alex Rivera
                                </h3>

                                <p className="text-xs sm:text-sm truncate"
                                    style={{
                                        color: "var(--text-light-color)",
                                    }}
                                >
                                    a.rivera@gamingplatform.com
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="px-2 sm:px-3 pb-2 sm:pb-3">

                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                className="w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl transition-default hover:bg-white/60"
                            >

                                <div
                                    style={{
                                        color: "var(--text-light-color)",
                                    }}
                                >
                                    {item.icon}
                                </div>

                                <span className="text-sm sm:text-base font-medium"
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
                        <button className="w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl transition-default hover:bg-red-50"
                        >

                            <LogOut size={18} className="text-red-500" />

                            <span className="text-sm sm:text-base font-semibold text-red-500">
                                Sign Out
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}