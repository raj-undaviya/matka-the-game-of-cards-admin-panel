import { useMemo, useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import DataTable from "@/components/shared/DataTable";
import TablePagination from "@/components/shared/TablePagination";
import { JACKPOT_WINNERS_PAGE_SIZE } from "@/data/jackpotData";

export default function RecentWinnersCard({ winners = [] }) {
  const [page, setPage] = useState(1);
  const [jumpPage, setJumpPage] = useState("");

  const pageCount = Math.max(1, Math.ceil(winners.length / JACKPOT_WINNERS_PAGE_SIZE));
  const paginated = useMemo(
    () => winners.slice((page - 1) * JACKPOT_WINNERS_PAGE_SIZE, page * JACKPOT_WINNERS_PAGE_SIZE),
    [page, winners]
  );

  const handlePageChange = (nextPage) => {
    setPage(Math.min(Math.max(1, nextPage), pageCount));
  };

  const handleJumpToPage = () => {
    const num = parseInt(jumpPage, 10);
    if (!Number.isNaN(num) && num >= 1 && num <= pageCount) {
      setPage(num);
      setJumpPage("");
    }
  };

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
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm flex min-w-0 flex-col justify-between h-full overflow-hidden">
      <div>
        {/* Header toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex min-w-0 items-center gap-2.5">
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
        <div className="space-y-3 sm:hidden">
          {paginated.map((winner) => (
            <div
              key={winner.id}
              className="rounded-xl border border-slate-100 bg-slate-50/40 p-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {winner.user.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm text-slate-800 truncate">
                    {winner.user}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {winner.timestamp}
                  </p>
                </div>
                <span className="text-sm font-extrabold text-emerald-600 shrink-0">
                  {winner.prize}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-slate-500 border border-slate-200/70">
                  {winner.game}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100/70">
                  <Check className="h-3.5 w-3.5" />
                  {winner.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden overflow-x-auto rounded-xl border border-slate-100 sm:block">
          <DataTable columns={columns} data={paginated} />
        </div>

        <TablePagination
          page={page}
          pageCount={pageCount}
          jumpPage={jumpPage}
          onPageChange={handlePageChange}
          onJumpPageChange={setJumpPage}
          onJumpToPage={handleJumpToPage}
        />
      </div>
    </div>
  );
}
