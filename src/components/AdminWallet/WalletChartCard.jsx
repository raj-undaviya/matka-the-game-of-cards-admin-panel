import SectionCard from "@/components/shared/SectionCard";

const rangeOptions = ["Live", "Last 24h", "Custom"];

export default function WalletChartCard() {
  return (
    <SectionCard
      className="overflow-hidden"
      bodyClassName="space-y-6"
      headerRight={
        <div className="flex rounded-lg border border-slate-200 bg-white p-1">
          {rangeOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`min-h-9 rounded-md px-3 text-sm font-bold transition-default sm:px-4 ${
                option === "Live"
                  ? "bg-slate-950 text-white"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      }
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950">24h Entry Fees</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Hourly trend analysis of competition entry volume
          </p>
        </div>
      </div>

      <div className="grid min-h-[18rem] place-items-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center">
        <p className="px-4 text-sm font-extrabold uppercase tracking-widest text-slate-400">
          Chart API will come here
        </p>
      </div>
    </SectionCard>
  );
}
