import { ShieldCheck } from "lucide-react";
import { arenaRiskProfile } from "@/data/gamesData";

export default function ArenaRiskProfile() {
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
          {arenaRiskProfile.title}
        </p>
        <p className="text-xs mt-1.5" style={{ color: "var(--text-color)" }}>
          {arenaRiskProfile.message}
        </p>
      </div>
    </div>
  );
}
