import { AlertTriangle, Globe, ShieldAlert } from "lucide-react";
import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import Button from "@/components/ui/Button";
import { riskAlerts, regionStats } from "@/data/riskData";

const severityStyles = {
  high: "border-red-200 bg-red-50",
  medium: "border-amber-200 bg-amber-50",
  low: "border-blue-200 bg-blue-50",
};

export default function AdminRiskPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Risk Management"
        subtitle="Monitor geographic activity, flagged accounts, and suspicious patterns."
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={20} style={{ color: "var(--primary-color)" }} />
            <h3 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>
              Geographic Activity
            </h3>
          </div>

          <div
            className="relative h-64 md:h-80 rounded-xl overflow-hidden flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #E0F2FE 0%, #D1FAE5 50%, #F0FDF4 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-30">
              {[...Array(12)].map((_, i) => (
                <span
                  key={i}
                  className="absolute h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: i % 3 === 0 ? "var(--danger-color)" : "var(--primary-color)",
                    top: `${15 + (i * 7) % 70}%`,
                    left: `${10 + (i * 11) % 80}%`,
                  }}
                />
              ))}
            </div>
            <p className="relative text-sm font-medium z-10" style={{ color: "var(--text-light-color)" }}>
              World map visualization — connect live geo API
            </p>
          </div>

          <ul className="mt-5 space-y-3">
            {regionStats.map((r) => (
              <li
                key={r.region}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <span className="font-medium">{r.region}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm" style={{ color: "var(--text-light-color)" }}>
                    {r.users.toLocaleString()} users
                  </span>
                  <StatusBadge type={r.risk === "high" ? "flagged" : r.risk === "medium" ? "pending" : "active"} label={r.risk} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldAlert size={20} style={{ color: "var(--danger-color)" }} />
              <h3 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>
                High Risk Alerts
              </h3>
            </div>
            <span
              className="text-xs font-bold px-2 py-1 rounded-full"
              style={{ backgroundColor: "#FEE2E2", color: "var(--danger-color)" }}
            >
              {riskAlerts.filter((a) => a.severity === "high").length} active
            </span>
          </div>

          <ul className="space-y-3">
            {riskAlerts.map((alert) => (
              <li
                key={alert.id}
                className={`rounded-xl border p-4 ${severityStyles[alert.severity]}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      size={18}
                      className="shrink-0 mt-0.5"
                      style={{
                        color:
                          alert.severity === "high"
                            ? "var(--danger-color)"
                            : alert.severity === "medium"
                              ? "#D97706"
                              : "var(--tertiary-color)",
                      }}
                    />
                    <div>
                      <p className="font-semibold text-sm">{alert.type}</p>
                      <p className="text-sm mt-0.5" style={{ color: "var(--text-light-color)" }}>
                        {alert.user} · {alert.region}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs shrink-0" style={{ color: "var(--text-light-color)" }}>
                    {alert.time}
                  </span>
                </div>
                <Button variant="secondary" size="small" className="mt-3">
                  Review
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageContainer>
  );
}
