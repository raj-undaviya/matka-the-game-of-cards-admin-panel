import { useState, useMemo, useRef } from "react";
import { RotateCw, ChevronDown, Layers, Activity, Globe, ArrowRight } from "lucide-react";
import DataTable from "@/components/shared/DataTable";
import TablePagination from "@/components/shared/TablePagination";
import useClickOutside from "@/hooks/useClickOutside";
import { FLAGGED_ACTIVITY_PAGE_SIZE } from "@/data/riskData";

export default function FlaggedActivityFeed({ data = [] }) {
  const [page, setPage] = useState(1);
  const [jumpPage, setJumpPage] = useState("");
  const [filter, setFilter] = useState("High Risk Only");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setDropdownOpen(false));

  const filteredData = useMemo(() => {
    if (filter === "High Risk Only") {
      return data.filter((item) => item.riskScore >= 80);
    }
    return data;
  }, [data, filter]);

  const pageCount = Math.max(1, Math.ceil(filteredData.length / FLAGGED_ACTIVITY_PAGE_SIZE));
  const paginated = useMemo(
    () => filteredData.slice((page - 1) * FLAGGED_ACTIVITY_PAGE_SIZE, page * FLAGGED_ACTIVITY_PAGE_SIZE),
    [filteredData, page]
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

  const resetPage = () => setPage(1);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  // Helper to render badge depending on flagged reason
  const renderReasonBadge = (reason) => {
    switch (reason) {
      case "MULTI-ACCOUNTING":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Layers className="h-3 w-3" />
            {reason}
          </span>
        );
      case "SUSPICIOUS PATTERN":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <Activity className="h-3 w-3" />
            {reason}
          </span>
        );
      case "PROXY/VPN USE":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-yellow-50 text-yellow-800 border border-yellow-200">
            <Globe className="h-3 w-3" />
            {reason}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            {reason}
          </span>
        );
    }
  };

  const columns = [
    {
      title: "USER ID / ENTITY",
      dataIndex: "user",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          {/* Gray numeric badge */}
          <span className="h-9 w-11 rounded-lg bg-slate-100 border border-slate-200/50 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
            {row.index}
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-slate-800 truncate">{value}</p>
            <p className="text-xs text-slate-400 font-mono tracking-tight mt-0.5">{row.userId}</p>
          </div>
        </div>
      ),
    },
    {
      title: "FLAG REASON",
      dataIndex: "reason",
      render: (value) => renderReasonBadge(value),
    },
    {
      title: "RISK SCORE",
      dataIndex: "riskScore",
      render: (value) => {
        const isVeryHigh = value >= 80;
        return (
          <span className="text-sm font-semibold">
            <span className={isVeryHigh ? "text-red-500 font-bold" : "text-amber-500 font-bold"}>
              {value}
            </span>
            <span className="text-slate-400 font-normal">/100</span>
          </span>
        );
      },
    },
    {
      title: "LOCATION / IP",
      dataIndex: "location",
      render: (value) => {
        // Find text before '(' and the IP within '(' and ')'
        const parts = value.match(/([^(]+)\(([^)]+)\)/);
        if (parts) {
          return (
            <div className="text-sm text-slate-600">
              <span className="font-medium text-slate-800">{parts[1].trim()}</span>{" "}
              <span className="text-slate-400 font-mono text-xs">({parts[2]})</span>
            </div>
          );
        }
        return <span className="text-sm text-slate-600">{value}</span>;
      },
    },
    {
      title: "TIMESTAMP",
      dataIndex: "timestamp",
      render: (value) => <span className="text-sm text-slate-500">{value}</span>,
    },
    {
      title: "ACTION",
      dataIndex: "action",
      render: () => (
        <button
          type="button"
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-all cursor-pointer"
        >
          Investigate
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      {/* Header controls section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Flagged Activity Feed
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Accounts requiring manual review
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Custom Styled Select Dropdown */}
          {/* <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 pl-4 pr-9 py-2.5 rounded-xl border border-slate-200 transition-colors focus:outline-none cursor-pointer"
            >
              <option value="High Risk Only">Filter: High Risk Only</option>
              <option value="All Risks">Filter: All Risks</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div> */}

          {/* Custom Premium Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 px-4 py-2.5 rounded-xl border border-slate-200 transition-all cursor-pointer"
            >
              <span>Filter: {filter}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-slate-500 transition-transform ${dropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
                {["High Risk Only", "All Risks"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setFilter(item);
                      resetPage();
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-xs font-medium transition-colors cursor-pointer
            ${filter === item
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-700 hover:bg-slate-50"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            title="Refresh feed"
          >
            <RotateCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Reusable DataTable Component */}
      <div className="overflow-hidden rounded-xl border border-slate-100">
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

      {/* Footer Link */}
      <div className="mt-5 flex justify-center">
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer group"
        >
          View Complete Audit Log
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
