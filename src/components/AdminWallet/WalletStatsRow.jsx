import { ArrowDownToLine, LineChart, ShieldCheck, WalletCards } from "lucide-react";
import { walletStats } from "@/data/walletData";

const iconMap = {
  wallet: WalletCards,
  trend: LineChart,
  deposit: ArrowDownToLine,
  shield: ShieldCheck,
};

const toneClasses = {
  emerald: "bg-emerald-50 text-emerald-700",
  blue: "bg-blue-50 text-blue-700",
  amber: "bg-amber-50 text-amber-700",
  slate: "bg-slate-50 text-slate-700",
};

export default function WalletStatsRow() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {walletStats.map((stat) => {
        const Icon = iconMap[stat.iconName] ?? WalletCards;

        return (
          <div
            key={stat.label}
            className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${
                  toneClasses[stat.tone] ?? toneClasses.emerald
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              {stat.delta && (
                <span className="rounded bg-emerald-50 px-2.5 py-1 text-sm font-extrabold text-emerald-700">
                  {stat.delta}
                </span>
              )}
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-widest text-slate-500">
              {stat.label}
            </p>
            <h2 className="mt-2 break-words text-2xl font-extrabold text-slate-950 md:text-3xl">
              {stat.value}
            </h2>
            {stat.deltaSub && (
              <p className="mt-3 text-sm font-medium text-slate-500">{stat.deltaSub}</p>
            )}
            {stat.barPct != null && (
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${stat.barPct}%` }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
