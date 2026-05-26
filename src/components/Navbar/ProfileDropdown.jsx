import { useEffect, useRef, useState } from "react";
import {
    Settings,
    Shield,
    KeyRound,
    ClipboardList,
    LogOut,
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

    const menuItems = [
        {
            icon: <Settings size={10} />,
            label: "Profile Settings",
        },
        {
            icon: <Shield size={10} />,
            label: "Security & 2FA",
        },
        {
            icon: <KeyRound size={10} />,
            label: "API Keys",
        },
        {
            icon: <ClipboardList size={10} />,
            label: "Audit Logs",
        },
    ];

    return (
        <div className="relative" ref={dropdownRef}>

            {/* Profile Button */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between transition-default"
            >

                {/* Left */}
                <div className="flex items-center gap-3">

                    {/* Avatar */}
                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                            backgroundColor: "var(--primary-light-color)",
                            color: "var(--primary-color)",
                        }}
                    >
                        AS
                    </div>

                    {/* User */}
                    <div className="text-left">
                        <h3 className="text-[12px] font-semibold leading-tight"
                            style={{
                                color: "var(--text-color)",
                            }}
                        >
                            Akshita Sondagar
                        </h3>

                        <p className="text-sm"
                            style={{
                                color: "var(--text-light-color)",
                            }}
                        >
                            Super Admin
                        </p>
                    </div>
                </div>
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute bottom-20 left-0 w-[350px] rounded-3xl overflow-hidden glass-search glass-search--active shadow-2xl z-50"
                >

                    {/* Header */}
                    <div className="p-6">

                        <p className="text-xs font-bold tracking-widest uppercase mb-5"
                            style={{
                                color: "var(--text-light-color)",
                            }}
                        >
                            Account
                        </p>

                        <div className="flex items-center gap-4">

                            {/* Avatar */}
                            <div className="h-14 w-14 rounded-2xl flex items-center justify-center text-xl font-bold"
                                style={{
                                    backgroundColor: "var(--primary-light-color)",
                                    color: "var(--primary-color)",
                                }}
                            >
                                AR
                            </div>

                            {/* Info */}
                            <div className="min-w-0">

                                <h3 className="text-2xl font-semibold truncate"
                                    style={{
                                        color: "var(--text-color)",
                                    }}
                                >
                                    Alex Rivera
                                </h3>

                                <p className="text-sm truncate"
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
                    <div className="px-3 pb-3">

                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-default hover:bg-white/60"
                            >

                                <div
                                    style={{
                                        color: "var(--text-light-color)",
                                    }}
                                >
                                    {item.icon}
                                </div>

                                <span className="text-lg font-medium"
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
                    <div className="mx-6 h-px"
                        style={{
                            backgroundColor: "var(--border-color)",
                        }}
                    />

                    {/* Logout */}
                    <div className="p-3">
                        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-default hover:bg-red-50"
                        >

                            <LogOut size={20} className="text-red-500" />

                            <span className="text-lg font-semibold text-red-500">
                                Sign Out
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}