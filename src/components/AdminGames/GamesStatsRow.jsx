import StatCard from "@/components/ui/StatCard";
import { gamesStats } from "@/data/gamesData";

export default function GamesStatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {gamesStats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label.toUpperCase()}
          value={stat.value}
          delta={stat.delta}
          deltaSub={stat.deltaSub}
          deltaColor={stat.deltaColor}
          deltaPositive={stat.deltaColor !== "danger"}
          barPct={stat.barPct}
          barColor={stat.barColor}
        />
      ))}
    </div>
  );
}
