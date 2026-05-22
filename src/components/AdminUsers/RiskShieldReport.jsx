import LinearProgress from "@mui/material/LinearProgress";
import { AlertTriangle } from "lucide-react";
import { riskShieldReport } from "@/data/usersData";

export default function RiskShieldReport() {
  const { kycComplianceRate, fraudScore, urgentAlert } = riskShieldReport;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>
        Risk Shield Report
      </h3>
      <p className="text-sm mt-1" style={{ color: "var(--text-light-color)" }}>
        Compliance and fraud monitoring summary
      </p>

      <div className="mt-6 space-y-5 flex-1">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span style={{ color: "var(--text-light-color)" }}>KYC Compliance Rate</span>
            <span className="font-semibold" style={{ color: "var(--primary-color)" }}>
              {kycComplianceRate}%
            </span>
          </div>
          <LinearProgress
            variant="determinate"
            value={kycComplianceRate}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: "var(--background-light-color)",
              "& .MuiLinearProgress-bar": { bgcolor: "var(--primary-color)" },
            }}
          />
        </div>

        <div className="flex justify-between items-center py-3 border-y border-gray-100">
          <span className="text-sm" style={{ color: "var(--text-light-color)" }}>
            Potential Fraud Score
          </span>
          <span
            className="text-sm font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: "var(--primary-light-color)", color: "var(--primary-color)" }}
          >
            {fraudScore}
          </span>
        </div>
      </div>

      <div
        className="mt-5 rounded-xl border p-4 flex gap-3"
        style={{
          backgroundColor: "#FFFBEB",
          borderColor: "#FDE68A",
        }}
      >
        <AlertTriangle size={20} className="shrink-0 mt-0.5" style={{ color: "#D97706" }} />
        <div>
          <p className="text-sm font-semibold" style={{ color: "#92400E" }}>
            {urgentAlert.title}
          </p>
          <p className="text-xs mt-1" style={{ color: "#B45309" }}>
            {urgentAlert.message}
          </p>
        </div>
      </div>
    </div>
  );
}
