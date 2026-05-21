import { devices } from "@/data/dashboarddata";

export default function DeviceDistribution() {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Device Distribution</h2>

            <div className="space-y-5">
                {devices.map((device) => (
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

            <div className="mt-8 border border-gray-200 rounded-xl p-5">
                <p className="text-xs font-bold text-gray-500">QUICK ACTION</p>
                <p className="mt-2 text-sm text-gray-700">
                    Optimize assets for mobile viewport density?
                </p>
                <button
                    type="button"
                    className="w-full mt-4 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                >
                    Start Optimization
                </button>
            </div>
        </div>
    );
}