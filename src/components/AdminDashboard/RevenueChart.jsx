import { revenueBars, revenueHours } from "@/data/dashboarddata";

export default function RevenueChart({
    bars = revenueBars,
    hours = revenueHours,
    growth = "+14.2%",
    period = "Gross platform revenue vs last period",
}) {
    const hasData = bars.length > 0;

    return (
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-full">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Revenue Telemetry</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        {period}
                    </p>
                </div>
                <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                    {growth}
                </span>
            </div>

            {hasData ? (
                <>
                    <div className="mt-10 h-72 flex items-end gap-2">
                        {bars.map((h, i) => (
                            <div key={i} className="flex-1 flex items-end h-full">
                                <div
                                    className={`w-full rounded-t-md ${i === bars.length - 1 ? "bg-green-600" : "bg-gray-300"
                                        }`}
                                    style={{ height: `${h}%` }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-4 text-xs text-gray-500">
                        {hours.map((hour) => (
                            <span key={hour}>{hour}</span>
                        ))}
                    </div>
                </>
            ) : (
                <div className="mt-10 flex h-72 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm font-semibold text-gray-500">
                    No revenue telemetry available.
                </div>
            )}
        </div>
    );
}
