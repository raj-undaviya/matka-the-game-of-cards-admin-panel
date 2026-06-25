import { ShieldCheck } from "lucide-react";
import { arenaRiskProfile as mockRiskProfile } from "@/data/gamesData";

export default function ArenaRiskProfile({ riskProfile }) {
  const displayProfile = riskProfile || mockRiskProfile;

  return (
    <div
      className="rounded-2xl border p-5 flex gap-3"
      style={{
        backgroundColor: "var(--primary-light-color)",
        borderColor: "var(--primary-color)",
      }}
    >
      <ShieldCheck size={22} className="shrink-0 mt-0.5" style={{ color: "var(--primary-color)" }} />
      <div>
        <p className="text-sm font-bold" style={{ color: "var(--primary-color)" }}>
          {displayProfile.title}
        </p>
        <p className="text-xs mt-1.5" style={{ color: "var(--text-color)" }}>
          {displayProfile.message}
        </p>
      </div>
    </div>
  );
}
