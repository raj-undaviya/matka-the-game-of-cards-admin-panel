import LinearProgress from "@mui/material/LinearProgress";
import { liquidityHealth as mockHealth } from "@/data/gamesData";

function LiquidityBar({ label, value, pct }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span style={{ color: "var(--text-light-color)" }}>{label}</span>
        <span className="font-semibold" style={{ color: "var(--text-color)" }}>
          {value}
        </span>
      </div>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: "var(--background-light-color)",
          "& .MuiLinearProgress-bar": { bgcolor: "var(--primary-color)", borderRadius: 4 },
        }}
      />
    </div>
  );
}

export default function LiquidityHealth({ health }) {
  const activeHealth = health || mockHealth;
  const { settlementReserve, exposureLimit } = activeHealth;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>
        Liquidity Health
      </h3>
      <p className="text-sm mt-1" style={{ color: "var(--text-light-color)" }}>
        Reserve and exposure monitoring
      </p>

      <div className="mt-5 space-y-5">
        <LiquidityBar {...settlementReserve} />
        <LiquidityBar {...exposureLimit} />
      </div>
    </div>
  );
}
