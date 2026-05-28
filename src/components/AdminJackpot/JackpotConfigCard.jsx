import { Sliders, CheckCheck, Info } from "lucide-react";
import Slider from "@mui/material/Slider";

/**
 * Reusable inline config input with dollar prefix.
 */
function ConfigInput({ label, value, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </label>
      <div className="relative rounded-xl border border-slate-200 bg-white shadow-sm focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all duration-200">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
          ₹
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent pl-7 pr-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default function JackpotConfigCard({
  houseEdge = 2.50,
  onChangeHouseEdge,
  minEntry = "1.00",
  onChangeMinEntry,
  seedAmount = "50,000.00",
  onChangeSeedAmount,
  onApply,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm flex min-w-0 flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <h3 className="text-base font-bold text-slate-900">
          Configuration Parameters
        </h3>
        <Sliders className="h-5 w-5 text-slate-400" />
      </div>

      {/* House Edge Contribution Slider */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-1">
          <div>
            <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
              House Edge Contribution
            </span>
            <p className="text-xs text-slate-400 mt-0.5">
              Percentage of net losses added to pool
            </p>
          </div>
          <span className="text-base font-extrabold text-emerald-600 shrink-0">
            {houseEdge.toFixed(2)}%
          </span>
        </div>

        <div className="px-1 mt-3">
          <Slider
            value={houseEdge}
            onChange={(_, v) => onChangeHouseEdge(v)}
            min={0.5}
            max={5.0}
            step={0.05}
            sx={{
              color: "var(--primary-color)",
              height: 6,
              "& .MuiSlider-thumb": {
                width: 18,
                height: 18,
                backgroundColor: "#fff",
                border: "3px solid currentColor",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "0 0 0 8px rgba(16, 185, 129, 0.16)",
                },
              },
              "& .MuiSlider-rail": {
                opacity: 0.3,
                backgroundColor: "var(--border-color)",
              },
            }}
          />
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mt-1">
            <span>MIN 0.5%</span>
            <span>MAX 5.0%</span>
          </div>
        </div>
      </div>

      {/* Min Entry & Seed Amount Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-4 mb-6">
        <ConfigInput
          label="Min Entry (₹)"
          value={minEntry}
          onChange={onChangeMinEntry}
        />
        <ConfigInput
          label="Seed Amount (₹)"
          value={seedAmount}
          onChange={onChangeSeedAmount}
        />
      </div>

      {/* Operational Notice */}
      <div className="flex gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl mb-6">
        <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-slate-700">Operational Notice</p>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Seed updates are queued and will apply automatically once the{" "}
            <span className="font-bold text-slate-700 underline underline-offset-2">
              current pool
            </span>{" "}
            is fully settled.
          </p>
        </div>
      </div>

      {/* Apply Parameters Button */}
      <button
        type="button"
        onClick={() => onApply?.()}
        className="mt-auto w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
      >
        Apply Parameters
        <CheckCheck className="h-4 w-4 transition-transform group-hover:scale-110" />
      </button>
    </div>
  );
}
