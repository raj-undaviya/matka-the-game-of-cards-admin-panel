import { ShieldCheck, Ban } from "lucide-react";
import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";

// Reusable components
import AverageRiskCard from "@/components/AdminRisk/AverageRiskCard";
import LoginHeatmapCard from "@/components/AdminRisk/LoginHeatmapCard";
import FlaggedActivityFeed from "@/components/AdminRisk/FlaggedActivityFeed";
import ThreatDistributionCard from "@/components/AdminRisk/ThreatDistributionCard";
import RecentMitigationActionsCard from "@/components/AdminRisk/RecentMitigationActionsCard";

// Mock Data
import {
  riskStats,
  flaggedActivity,
  threatDistribution,
  recentMitigations,
} from "@/data/riskData";

export default function AdminRiskPage() {
  // Page Header Action Buttons
  const headerActions = (
    <div className="flex w-full flex-col gap-3 items-stretch justify-start xl:w-auto xl:flex-row xl:items-center xl:justify-end">

      {/* Trigger KYC Re-verification Button */}
      <button
        type="button"
        className="inline-flex w-full items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold text-center shadow-sm transition-all duration-200 cursor-pointer xl:w-auto"
        onClick={() => alert("KYC Re-verification process triggered for flagged users.")}
      >
        <ShieldCheck className="h-4 w-4 text-slate-500" />
        Trigger KYC Re-verification
      </button>

      {/* Bulk Freeze Flagged Accounts Button */}
      <button
        type="button"
        className="inline-flex w-full items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold text-center shadow-sm transition-all duration-200 cursor-pointer xl:w-auto"
        onClick={() => alert("Bulk freeze action initiated.")}
      >
        <Ban className="h-4 w-4" />
        Bulk Freeze Flagged Accounts
      </button>
    </div>
  );

  return (
    <PageContainer>
      {/* Page Title & Actions */}
      <div className="mb-4 md:mb-6 min-w-0">
        <PageHeader
          title="Risk & Fraud Control"
          subtitle="Real-time threat detection and security oversight."
          actions={headerActions}
        />
      </div>

      {/* Grid Layout */}
      <div className="min-w-0 space-y-4 md:space-y-6">
        {/* Row 1: Average Platform Risk (1/3) & Login Heatmap (2/3) */}
        <div className="grid min-w-0 grid-cols-1 gap-4 md:gap-6 xl:grid-cols-[minmax(18rem,1fr)_minmax(0,2fr)]">
          <div className="min-w-0">
            <AverageRiskCard
              averageRisk={riskStats.averageRisk}
              riskDelta={riskStats.riskDelta}
              highRiskAlerts={riskStats.highRiskAlerts}
              blockedIps={riskStats.blockedIps.toLocaleString()}
            />
          </div>
          <div className="min-w-0">
            <LoginHeatmapCard />
          </div>
        </div>

        {/* Row 2: Flagged Activity Feed (Full Width) */}
        <div className="w-full min-w-0">
          <FlaggedActivityFeed data={flaggedActivity} />
        </div>

        {/* Row 3: Threat Distribution (1/2) & Recent Mitigation Actions (1/2) */}
        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div className="min-w-0">
            <ThreatDistributionCard data={threatDistribution} />
          </div>
          <div className="min-w-0">
            <RecentMitigationActionsCard data={recentMitigations} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
