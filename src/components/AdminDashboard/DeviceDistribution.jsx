import { devices } from "@/data/dashboarddata";

export default function DeviceDistribution({ items = devices }) {
    const hasDevices = items.length > 0;

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Device Distribution</h2>

            {hasDevices ? (
                <div className="space-y-5">
                    {items.map((device) => (
                        <div key={device.label}>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">{device.label}</span>
                                <span className="font-semibold">{device.pct}%</span>
                            </div>
                            <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                                <div
                                    className={`h-full ${device.color}`}
                                    style={{ width: `${device.pct}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center text-sm font-semibold text-gray-500">
                    No device data available.
                </div>
            )}

        </div>
    );
}
