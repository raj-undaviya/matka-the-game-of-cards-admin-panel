import LinearProgress from "@mui/material/LinearProgress";

const LOAD_COLORS = {
  low: "var(--primary-color)",
  medium: "#F59E0B",
  high: "var(--danger-color)",
};

export default function LoadBar({ value }) {
  const color =
    value >= 85 ? LOAD_COLORS.high : value >= 60 ? LOAD_COLORS.medium : LOAD_COLORS.low;

  return (
    <div className="min-w-[100px]">
      <div className="flex justify-between text-xs mb-1">
        <span style={{ color: "var(--text-light-color)" }}>Load</span>
        <span className="font-semibold" style={{ color: "var(--text-color)" }}>
          {value}%
        </span>
      </div>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 6,
          borderRadius: 3,
          bgcolor: "var(--background-light-color)",
          "& .MuiLinearProgress-bar": { bgcolor: color, borderRadius: 3 },
        }}
      />
    </div>
  );
}
