import { Check, ArrowUpRight } from "lucide-react";
import DataTable from "@/components/shared/DataTable";

export default function RecentWinnersCard({ winners = [] }) {
  const columns = [
    {
      title: "Winner Details",
      dataIndex: "user",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          {/* Circular avatar block */}
          <div className="h-9 w-9 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
            {value.substring(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm text-slate-800 truncate">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{row.timestamp}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Prize Amount",
      dataIndex: "prize",
      render: (value) => (
        <span className="text-sm font-extrabold text-emerald-600">
          {value}
        </span>
      ),
    },
    {
      title: "Source Game",
      dataIndex: "game",
      render: (value) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-200/50">
          {value}
        </span>
      ),
    },
    {
      title: "Settlement",
      dataIndex: "status",
      render: (value) => (
        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50/50 px-2 py-1 rounded-lg border border-emerald-100/50">
          <Check className="h-3.5 w-3.5" />
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Header toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-bold text-slate-900">
              Recent Global Winners
            </h3>
            
            {/* Blinking Live status tag */}
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-rose-50 text-rose-600 border border-rose-100">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
              </span>
              LIVE
            </span>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group"
          >
            Full History
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Table data view */}
        <div className="overflow-hidden rounded-xl border border-slate-100">
          <DataTable columns={columns} data={winners} />
        </div>
      </div>
    </div>
  );
}
