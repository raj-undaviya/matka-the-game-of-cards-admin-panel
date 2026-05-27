import { useState, useRef, useEffect } from "react";
import {
    Bell,
    AlertTriangle,
    Server,
    Trophy,
    Fingerprint,
} from "lucide-react";
import useClickOutside from "@/hooks/useClickOutside";

export default function NotificationMenu() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

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

    const notifications = [
        {
            title: "High-value Withdrawal Flagged",
            desc: "Transaction ID #VT-9842 triggered risk level 4 alert.",
            time: "2 minutes ago",
            color: "bg-red-100 text-red-500",
            dot: "bg-red-500",
            icon: <AlertTriangle size={18} />,
        },
        {
            title: "Server Scaling Alert",
            desc: "3 new worker nodes added successfully.",
            time: "14 minutes ago",
            color: "bg-blue-100 text-blue-500",
            dot: "bg-blue-500",
            icon: <Server size={18} />,
        },
        {
            title: "New Jackpot Winner",
            desc: "User won the Mega Fortune jackpot.",
            time: "42 minutes ago",
            color: "bg-green-100 text-green-500",
            dot: "bg-green-500",
            icon: <Trophy size={18} />,
        },
        {
            title: "User Verification Pending",
            desc: "KYC verification queue updated.",
            time: "1 hour ago",
            color: "bg-gray-100 text-gray-500",
            dot: "bg-gray-500",
            icon: <Fingerprint size={18} />,
        },
    ];

    return (
        <div className="relative" ref={dropdownRef}>

            {/* Notification Button */}
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition"
            >
                <Bell size={22} />

                {/* Red Notification Dot */}
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Mobile backdrop overlay */}
            {open && (
                <div
                    className="sm:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Dropdown */}
            {open && (
                <div
                    className={`
                        z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden
                        fixed sm:absolute
                        inset-x-3 bottom-3 top-auto
                        sm:inset-auto sm:right-0 sm:top-full sm:mt-4
                        w-auto sm:w-[380px]
                        max-h-[calc(100vh-6rem)]
                        animate-in fade-in zoom-in duration-200
                    `}
                >

                    {/* Header */}
                    <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4">
                        <h2 className="font-semibold text-base sm:text-lg">
                            Notifications
                        </h2>

                        <button className="text-green-600 text-xs sm:text-sm font-medium hover:underline">
                            MARK ALL AS READ
                        </button>
                    </div>

                    {/* Notification List */}
                    <div className="max-h-[320px] sm:max-h-[420px] overflow-y-auto">

                        {notifications.map((item, index) => (
                            <div
                                key={index}
                                className="flex gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 hover:bg-gray-50 transition cursor-pointer relative"
                            >

                                {/* Icon */}
                                <div
                                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}
                                >
                                    {item.icon}
                                </div>

                                {/* Text */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-sm sm:text-[15px] text-gray-800 truncate">
                                        {item.title}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 leading-relaxed line-clamp-2">
                                        {item.desc}
                                    </p>

                                    <span className="text-[10px] sm:text-xs text-gray-400 mt-1 sm:mt-2 block">
                                        {item.time}
                                    </span>
                                </div>

                                {/* Unread Dot */}
                                <div
                                    className={`w-2 h-2 rounded-full mt-2 shrink-0 ${item.dot}`}
                                ></div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <button className="w-full py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-50 border-t border-gray-100">
                        View all notifications
                    </button>
                </div>
            )}
        </div>
    );
}