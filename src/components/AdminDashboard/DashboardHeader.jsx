import { Download, RefreshCw } from "lucide-react";

export default function DashboardHeader() {
    return (
        <div className="flex justify-between items-center">

            <div>
                <h1 className="text-4xl font-bold">
                    Platform Overview
                </h1>

                <p className="text-gray-500">
                    Real-time telemetry
                </p>
            </div>

            <div className="flex gap-3">

                <button className="flex gap-2 items-center px-5 py-3 border rounded-lg">
                    <Download size={18} />
                    Export PDF
                </button>

                <button className="flex gap-2 items-center px-5 py-3 bg-green-600 text-white rounded-lg">
                    <RefreshCw size={18} />
                    Live Refresh
                </button>

            </div>

        </div>
    );
}