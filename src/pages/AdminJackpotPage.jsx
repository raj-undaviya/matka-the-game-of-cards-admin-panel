import { useState } from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { RotateCcw } from "lucide-react";
import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import CountdownTimer from "@/components/charts/CountdownTimer";
import { jackpotConfig, countdownTarget } from "@/data/jackpotData";

export default function AdminJackpotPage() {
  const [incrementRate, setIncrementRate] = useState(jackpotConfig.incrementRate);
  const [triggerThreshold, setTriggerThreshold] = useState(jackpotConfig.triggerThreshold);

  return (
    <PageContainer>
      <PageHeader
        title="Jackpot Management"
        subtitle="Configure the global mega pool, countdown, and payout triggers."
      />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-sm text-center">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-light-color)" }}>
          {jackpotConfig.poolLabel}
        </p>
        <h2
          className="mt-2 text-4xl md:text-5xl font-bold"
          style={{ color: "var(--primary-color)" }}
        >
          {jackpotConfig.poolAmount}
        </h2>
        <p className="mt-3 text-sm" style={{ color: "var(--text-light-color)" }}>
          Last winner: <strong>{jackpotConfig.lastWinner}</strong> — {jackpotConfig.lastWinAmount}
        </p>

        <div className="mt-10 pt-8 border-t border-gray-100">
          <p className="text-sm font-semibold mb-6" style={{ color: "var(--text-light-color)" }}>
            Next Draw Countdown
          </p>
          <CountdownTimer target={countdownTarget} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>
            Pool Configuration
          </h3>

          <div>
            <label className="text-sm font-medium" style={{ color: "var(--text-light-color)" }}>
              Increment Rate ({incrementRate}%)
            </label>
            <Slider
              value={incrementRate}
              onChange={(_, v) => setIncrementRate(v)}
              min={0.5}
              max={10}
              step={0.1}
              color="primary"
              className="mt-2"
            />
          </div>

          <TextField
            fullWidth
            label="Trigger Threshold ($)"
            type="number"
            value={triggerThreshold}
            onChange={(e) => setTriggerThreshold(Number(e.target.value))}
          />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>
              Manual Actions
            </h3>
            <p className="mt-2 text-sm" style={{ color: "var(--text-light-color)" }}>
              Reset the global pool or force an early draw. These actions are logged and require
              super-admin approval in production.
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button variant="secondary" fullWidth>
              Force Early Draw
            </Button>
            <Button
              variant="primary"
              startIcon={<RotateCcw size={18} />}
              fullWidth
              sx={{
                bgcolor: "error.main",
                "&:hover": { bgcolor: "error.dark" },
              }}
            >
              Reset Pool
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
