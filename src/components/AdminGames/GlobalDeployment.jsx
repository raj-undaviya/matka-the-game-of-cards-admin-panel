import { Globe } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import { deploymentRegions as mockRegions } from "@/data/gamesData";

export default function GlobalDeployment({ regions }) {
  const displayRegions = regions || mockRegions;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Globe size={20} style={{ color: "var(--primary-color)" }} />
          <h3 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>
            Global Deployment
          </h3>
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
          style={{ backgroundColor: "#FEE2E2", color: "var(--danger-color)" }}
        >
          Live Feed
        </span>
      </div>

      <div
        className="relative h-36 rounded-xl mb-4 overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #E0F2FE 0%, #D1FAE5 50%, #F0FDF4 100%)",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute h-2.5 w-2.5 rounded-full animate-pulse"
            style={{
              backgroundColor: i % 2 === 0 ? "var(--primary-color)" : "var(--tertiary-color)",
              top: `${20 + (i * 11) % 60}%`,
              left: `${15 + (i * 13) % 70}%`,
            }}
          />
        ))}
      </div>

      <ul className="space-y-3">
        {displayRegions.map((r) => (
          <li
            key={r.region}
            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
          >
            <span className="text-sm font-medium">{r.region}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs" style={{ color: "var(--text-light-color)" }}>
                {r.latency}ms
              </span>
              <StatusBadge type={r.statusType || "running"} label={r.status} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
