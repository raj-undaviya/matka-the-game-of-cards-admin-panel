import { Download, Landmark } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

export default function WalletHeader() {
  return (
    <PageHeader
      title="Wallet & Revenue"
      subtitle="Platform liquidity monitoring and fiscal health metrics."
      actions={
        <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3 lg:justify-end">
          <button
            type="button"
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition-default hover:bg-slate-50 sm:flex-none"
          >
            <Download className="h-4 w-4 text-slate-500" />
            Export CSV
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white shadow-sm transition-default hover:bg-emerald-700 sm:flex-none"
          >
            <Landmark className="h-4 w-4" />
            Withdraw Funds
          </button>
        </div>
      }
    />
  );
}
