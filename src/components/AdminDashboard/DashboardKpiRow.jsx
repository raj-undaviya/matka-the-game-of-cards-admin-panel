import { Users, Activity, DollarSign, Trophy } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import { kpiCards } from "@/data/dashboarddata";

const iconMap = {
  Users: <Users size={18} />,
  Activity: <Activity size={18} />,
  DollarSign: <DollarSign size={18} />,
  Trophy: <Trophy size={18} />,
};

export default function DashboardKpiRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpiCards.map((card) => (
        <StatCard
          key={card.label}
          label={card.label}
          value={card.value}
          delta={card.delta}
          deltaSub={card.deltaSub}
          barPct={card.barPct}
          barColor={card.barColor}
          icon={iconMap[card.iconName]}
        />
      ))}
    </div>
  );
}
