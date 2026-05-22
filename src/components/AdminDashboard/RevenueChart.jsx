import { revenueBars,revenueHours } from "@/data/dashboarddata";

export default function RevenueChart() {
    return (
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-full">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Revenue Telemetry</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Gross platform revenue vs last period
                    </p>
                </div>
                <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                    +14.2%
                </span>
            </div>

            {/* Bars */}
            <div className="mt-10 h-72 flex items-end gap-2">
                {revenueBars.map((h, i) => (
                    <div key={i} className="flex-1 flex items-end h-full">
                        <div
                            className={`w-full rounded-t-md ${i === revenueBars.length - 1 ? "bg-green-600" : "bg-gray-300"
                                }`}
                            style={{ height: `${h}%` }}
                        />
                    </div>
                ))}
            </div>

            {/* Hour labels */}
            <div className="flex justify-between mt-4 text-xs text-gray-500">
                {revenueHours.map((hour) => (
                    <span key={hour}>{hour}</span>
                ))}
            </div>
        </div>
    );
}