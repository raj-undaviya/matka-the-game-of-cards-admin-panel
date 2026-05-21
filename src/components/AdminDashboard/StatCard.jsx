import { Users2, Network } from "lucide-react";

// Map string names → actual icon components
const iconMap = { Users2, Network };

export default function StatCard({ label, value, unit, delta, deltaSub, iconName, barColor, barPct }) {
    const Icon = iconMap[iconName] ?? null;

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-start justify-between">
                <div className="text-xs font-bold text-gray-500">{label}</div>
                {Icon && <Icon size={20} />}
            </div>

            <div className="mt-4 flex items-end gap-2">
                <h2 className="text-4xl font-bold">{value}</h2>
                {unit && <span className="text-gray-500 mb-1">{unit}</span>}
            </div>

            <div className="mt-2 text-sm">
                <span className="font-semibold text-green-600">{delta}</span>
                <span className="text-gray-500 ml-1">{deltaSub}</span>
            </div>

            <div className="mt-5 h-2 rounded-full bg-gray-200 overflow-hidden">
                <div className={`h-full ${barColor}`} style={{ width: `${barPct}%` }} />
            </div>
        </div>
    );
}