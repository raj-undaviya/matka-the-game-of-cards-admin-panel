import JurisdictionalStatus from "@/components/AdminPolicies/JurisdictionalStatus";
import RestrictionControls from "@/components/AdminPolicies/RestrictionControls";

export default function PoliciesSidebar({
  jurisdictions,
  complianceRate,
  controls,
  onToggleRestriction,
}) {
  return (
    <div className="space-y-6">
      <JurisdictionalStatus jurisdictions={jurisdictions} complianceRate={complianceRate} />
      <RestrictionControls controls={controls} onToggle={onToggleRestriction} />
    </div>
  );
}
