import JurisdictionalStatus from "@/components/AdminPolicies/JurisdictionalStatus";
import RestrictionControls from "@/components/AdminPolicies/RestrictionControls";

export default function PoliciesSidebar() {
  return (
    <div className="space-y-6">
      <JurisdictionalStatus />
      <RestrictionControls />
    </div>
  );
}
