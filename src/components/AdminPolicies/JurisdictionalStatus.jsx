import { Shield, CheckCircle2, AlertCircle } from "lucide-react";
import SectionCard from "@/components/shared/SectionCard";
import { jurisdictions, complianceRate } from "@/data/policiesData";

export default function JurisdictionalStatus() {
  return (
    <SectionCard
      title="Jurisdictional Status"
      icon={Shield}
      headerRight={
        <span
          className="text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shrink-0"
          style={{
            backgroundColor: "var(--primary-light-color)",
            color: "var(--primary-color)",
          }}
        >
          {complianceRate}% Compliant
        </span>
      }
      bodyClassName="pt-4"
    >
      <ul className="space-y-4">
        {jurisdictions.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl shrink-0">{item.flag}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: "var(--text-color)" }}>
                  {item.name}
                </p>
                <p className="text-xs truncate" style={{ color: "var(--text-light-color)" }}>
                  {item.subtitle}
                </p>
              </div>
            </div>
            {item.status === "compliant" ? (
              <CheckCircle2 size={20} className="shrink-0" style={{ color: "var(--primary-color)" }} />
            ) : (
              <AlertCircle size={20} className="shrink-0" style={{ color: "var(--danger-color)" }} />
            )}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-5 text-sm font-semibold transition-default primary-hover"
        style={{ color: "var(--tertiary-color)" }}
      >
        View All Jurisdictions
      </button>
    </SectionCard>
  );
}
