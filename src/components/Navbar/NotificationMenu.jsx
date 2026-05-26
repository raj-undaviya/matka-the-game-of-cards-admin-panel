import { useState, useRef, useEffect } from "react";
import {
    Bell,
    AlertTriangle,
    Server,
    Trophy,
    Fingerprint,
} from "lucide-react";

export default function NotificationMenu() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    // Close when click outside
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

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

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

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-4 w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in zoom-in duration-200">

                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4">
                        <h2 className="font-semibold text-lg">
                            Notifications
                        </h2>

                        <button className="text-green-600 text-sm font-medium hover:underline">
                            MARK ALL AS READ
                        </button>
                    </div>

                    {/* Notification List */}
                    <div className="max-h-[420px] overflow-y-auto">

                        {notifications.map((item, index) => (
                            <div
                                key={index}
                                className="flex gap-4 px-5 py-4 hover:bg-gray-50 transition cursor-pointer relative"
                            >

                                {/* Icon */}
                                <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}
                                >
                                    {item.icon}
                                </div>

                                {/* Text */}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-[15px] text-gray-800">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                                        {item.desc}
                                    </p>

                                    <span className="text-xs text-gray-400 mt-2 block">
                                        {item.time}
                                    </span>
                                </div>

                                {/* Unread Dot */}
                                <div
                                    className={`w-2 h-2 rounded-full mt-2 ${item.dot}`}
                                ></div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <button className="w-full py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                        View all notifications
                    </button>
                </div>
            )}
        </div>
    );
}