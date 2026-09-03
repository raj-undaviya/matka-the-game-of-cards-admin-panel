import StatCard from "@/components/ui/StatCard";
import { gamesStats as mockStats } from "@/data/gamesData";
import { Gamepad2, Coins, RefreshCw, Users } from "lucide-react";

const iconMap = {
  "TOTAL ACTIVE ARENAS": <Gamepad2 size={18} />,
  "TOTAL POOL VALUE": <Coins size={18} />,
  "INITIALIZING STATUS": <RefreshCw size={18} />,
  "PEAK CONCURRENT USERS": <Users size={18} />,
};

const barColorMap = {
  "bg-green-500": "bg-gradient-to-r from-emerald-400 to-teal-500 shadow-sm",
  "bg-blue-500": "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-sm",
  "bg-violet-500": "bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-sm",
  "bg-red-400": "bg-gradient-to-r from-rose-400 to-red-500 shadow-sm",
};

export default function GamesStatsRow({ stats }) {
  const displayStats = stats || mockStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {displayStats.map((stat) => {
        const uppercaseLabel = stat.label.toUpperCase();
        return (
          <StatCard
            key={stat.label}
            label={uppercaseLabel}
            value={stat.value}
            delta={stat.delta}
            deltaSub={stat.deltaSub}
            deltaColor={stat.deltaColor}
            deltaPositive={stat.deltaColor !== "danger"}
            barPct={stat.barPct}
            barColor={barColorMap[stat.barColor] || stat.barColor}
            icon={iconMap[uppercaseLabel]}
          />
        );
      })}
    </div>
  );
}
