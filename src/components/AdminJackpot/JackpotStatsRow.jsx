import { Users, Wallet, Flame, Shield } from "lucide-react";

/**
 * Reusable compact stat card for the Jackpot page bottom row.
 * Displays a colored icon, uppercase label, and bold value in a horizontal layout.
 *
 * @param {object}  props
 * @param {React.ElementType} props.icon   - Lucide icon component
 * @param {string}  props.iconBg           - Tailwind bg class for icon container
 * @param {string}  props.iconColor        - Tailwind text class for icon
 * @param {string}  props.label            - Uppercase metric label
 * @param {string}  props.value            - Bold display value
 * @param {string}  [props.unit]           - Optional small suffix (e.g. "/hr")
 */
function JackpotStatCard({ icon: Icon, iconBg, iconColor, label, value, unit }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 px-5 py-4 shadow-sm flex items-center gap-4 min-w-0 hover:shadow-md transition-shadow duration-200">
      {/* Colored icon badge */}
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-xl shrink-0 ${iconBg}`}
      >
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </span>

      {/* Text content */}
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 truncate">
          {label}
        </p>
        <p className="text-xl font-extrabold text-slate-900 mt-0.5 leading-tight">
          {value}
          {unit && (
            <span className="text-xs font-semibold text-slate-400 ml-0.5">
              {unit}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

/**
 * Bottom stats row for the Jackpot page.
 * Renders a responsive 4-column grid of JackpotStatCard items.
 *
 * @param {object} props
 * @param {string} props.uniquePlayers  - e.g. "42,801"
 * @param {string} props.avgPayout      - e.g. "$18,402"
 * @param {string} props.burnRate       - e.g. "0.08%"
 * @param {string} props.reserveRatio   - e.g. "114%"
 */
export default function JackpotStatsRow({
  uniquePlayers = "42,801",
  avgPayout = "$18,402",
  burnRate = "0.08%",
  reserveRatio = "114%",
}) {
  const stats = [
    {
      icon: Users,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-500",
      label: "Unique Players",
      value: uniquePlayers,
    },
    {
      icon: Wallet,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
      label: "Avg. Payout",
      value: avgPayout,
    },
    {
      icon: Flame,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
      label: "Burn Rate",
      value: burnRate,
      unit: "/hr",
    },
    {
      icon: Shield,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-500",
      label: "Reserve Ratio",
      value: reserveRatio,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <JackpotStatCard key={s.label} {...s} />
      ))}
    </div>
  );
}
