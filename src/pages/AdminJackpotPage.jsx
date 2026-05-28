import { useState } from "react";
import { Download, Plus } from "lucide-react";
import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";

// Reusable jackpot components
import ActivePoolCard from "@/components/AdminJackpot/ActivePoolCard";
import NextDrawCard from "@/components/AdminJackpot/NextDrawCard";
import RecentWinnersCard from "@/components/AdminJackpot/RecentWinnersCard";
import JackpotConfigCard from "@/components/AdminJackpot/JackpotConfigCard";
import JackpotStatsRow from "@/components/AdminJackpot/JackpotStatsRow";

// Mock Data
import {
  jackpotStats,
  countdownTarget,
  recentWinners,
  jackpotConfig,
} from "@/data/jackpotData";

export default function AdminJackpotPage() {
  // Config parameters state
  const [houseEdge, setHouseEdge] = useState(jackpotConfig.houseEdgeContribution);
  const [minEntry, setMinEntry] = useState(jackpotConfig.minEntry);
  const [seedAmount, setSeedAmount] = useState(jackpotConfig.seedAmount);
  const [maxPayout, setMaxPayout] = useState(jackpotConfig.maxPayoutMultiplier);
  const [drawFrequency, setDrawFrequency] = useState(jackpotConfig.drawFrequency);
  const [autoSeed, setAutoSeed] = useState(jackpotConfig.autoSeedEnabled);

  const handleResetConfig = () => {
    setHouseEdge(jackpotConfig.houseEdgeContribution);
    setMinEntry(jackpotConfig.minEntry);
    setSeedAmount(jackpotConfig.seedAmount);
    setMaxPayout(jackpotConfig.maxPayoutMultiplier);
    setDrawFrequency(jackpotConfig.drawFrequency);
    setAutoSeed(jackpotConfig.autoSeedEnabled);
  };

  const handleSaveConfig = () => {
    alert("Configuration saved successfully.");
  };

  // Header action buttons
  const headerActions = (
    <div className="flex w-full flex-wrap gap-2 sm:gap-3 items-center justify-start lg:justify-end">

      {/* Export Report Button */}
      <button
        type="button"
        className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm transition-all duration-200 cursor-pointer"
        onClick={() => alert("Jackpot report export initiated.")}
      >
        <Download className="h-4 w-4 text-slate-500" />
        Export Report
      </button>

      {/* New Prize Pool Button */}
      <button
        type="button"
        className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all duration-200 cursor-pointer"
        onClick={() => alert("Setup dialogue opened for a new prize pool.")}
      >
        <Plus className="h-4 w-4" />
        New Prize Pool
      </button>
    </div>
  );

  return (
    <PageContainer>
      {/* Title Header with actions */}
      <div className="mb-4 md:mb-6 min-w-0">
        <PageHeader
          title="Jackpot Management"
          subtitle="Real-time control and configuration for global prize pools."
          actions={headerActions}
        />
      </div>

      {/* Row 1: Metrics summary cards */}
      <JackpotStatsRow
        uniquePlayers={jackpotStats.uniquePlayers}
        avgPayout={jackpotStats.avgPayout}
        burnRate={jackpotStats.burnRate}
        reserveRatio={jackpotStats.reserveRatio}
      />

      {/* Grid Layout spacing */}
      <div className="min-w-0 space-y-4 md:space-y-6">
        {/* Row 1: Active Pool (2/3 width) and Next Draw Sequence (1/3 width) */}
        <div className="grid min-w-0 grid-cols-1 gap-4 md:gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(17rem,1fr)]">
          <div className="min-w-0">
            <ActivePoolCard
              poolAmount={jackpotStats.poolAmount}
              growthTrend={jackpotStats.growthTrend}
              targetAmount={jackpotStats.targetAmount}
              totalEntries={jackpotStats.totalEntries}
              avgContribution={jackpotStats.avgContribution}
              trendValues={jackpotStats.trendValues}
            />
          </div>
          <div className="min-w-0">
            <NextDrawCard targetDate={countdownTarget} />
          </div>
        </div>

        {/* Row 2: Recent Global Winners (2/3 width) and Config Parameters (1/3 width) */}
        <div className="grid min-w-0 grid-cols-1 gap-4 md:gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(17rem,1fr)]">
          <div className="min-w-0">
            <RecentWinnersCard winners={recentWinners} />
          </div>
          <div className="min-w-0">
            <JackpotConfigCard
              houseEdge={houseEdge}
              onChangeHouseEdge={setHouseEdge}
              minEntry={minEntry}
              onChangeMinEntry={setMinEntry}
              seedAmount={seedAmount}
              onChangeSeedAmount={setSeedAmount}
              maxPayoutMultiplier={maxPayout}
              onChangeMaxPayout={setMaxPayout}
              drawFrequency={drawFrequency}
              onChangeDrawFrequency={setDrawFrequency}
              autoSeedEnabled={autoSeed}
              onChangeAutoSeed={setAutoSeed}
              onSave={handleSaveConfig}
              onReset={handleResetConfig}
            />
          </div>
        </div>

      </div>
    </PageContainer>
  );
}
