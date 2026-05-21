import { Server, AlertTriangle } from "lucide-react";

export default function ClusterCard({ name, status, ok }) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div
                className={`h-12 w-12 rounded-xl flex items-center justify-center ${ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
            >
                {ok ? <Server size={22} /> : <AlertTriangle size={22} />}
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-500">{name}</p>
                <h3 className={`text-lg font-semibold ${ok ? "text-black" : "text-red-600"}`}>
                    {status}
                </h3>
            </div>
        </div>
    );
}