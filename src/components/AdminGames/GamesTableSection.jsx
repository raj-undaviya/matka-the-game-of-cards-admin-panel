import { useMemo, useState } from "react";
import { Castle, Sun, Zap, Waves, Flame, Shield, Settings, Eye } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import LoadBar from "@/components/shared/LoadBar";
import TablePagination from "@/components/shared/TablePagination";
import {
  arenaInstances,
  GAMES_PAGE_SIZE,
  TOTAL_ACTIVE_ARENAS,
} from "@/data/gamesData";

const iconMap = {
  castle: Castle,
  sun: Sun,
  zap: Zap,
  waves: Waves,
  flame: Flame,
  shield: Shield,
};

const columns = [
  {
    title: "ARENA NAME / ID",
    dataIndex: "name",
    render: (_, row) => {
      const Icon = iconMap[row.icon] ?? Castle;
      return (
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{
              backgroundColor: "var(--primary-light-color)",
              color: "var(--primary-color)",
            }}
          >
            <Icon size={18} />
          </span>
          <div>
            <p className="font-semibold">{row.name}</p>
            <p className="text-xs" style={{ color: "var(--text-light-color)" }}>
              #{row.id}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    title: "STATUS",
    dataIndex: "status",
    render: (value) => <StatusBadge type={value.toLowerCase()} label={value} />,
  },
  {
    title: "POOL SIZE",
    dataIndex: "poolSize",
    render: (value, row) => (
      <div>
        <p className="font-semibold">{value}</p>
        <p className="text-xs" style={{ color: "var(--text-light-color)" }}>
          {row.investors.toLocaleString()} investors
        </p>
      </div>
    ),
  },
  {
    title: "LOAD",
    dataIndex: "load",
    render: (value) => <LoadBar value={value} />,
  },
  {
    title: "ACTIONS",
    dataIndex: "id",
    render: (value) => (
      <div className="flex items-center gap-1">
        <Tooltip title="View arena">
          <IconButton size="small" aria-label={`View ${value}`}>
            <Eye size={18} style={{ color: "var(--text-light-color)" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Arena settings">
          <IconButton size="small" aria-label={`Settings ${value}`}>
            <Settings size={18} style={{ color: "var(--text-light-color)" }} />
          </IconButton>
        </Tooltip>
      </div>
    ),
  },
];

export default function GamesTableSection() {
  const [page, setPage] = useState(1);
  const [jumpPage, setJumpPage] = useState("");

  const pageCount = Math.max(1, Math.ceil(arenaInstances.length / GAMES_PAGE_SIZE));
  const paginated = useMemo(
    () => arenaInstances.slice((page - 1) * GAMES_PAGE_SIZE, page * GAMES_PAGE_SIZE),
    [page]
  );

  const showingFrom = (page - 1) * GAMES_PAGE_SIZE + 1;
  const showingTo = Math.min(page * GAMES_PAGE_SIZE, arenaInstances.length);

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

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h2 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>
          Active Arena Instances
        </h2>
        <div className="flex items-center gap-4 text-xs font-semibold uppercase">
          <span className="flex items-center gap-1.5" style={{ color: "var(--text-light-color)" }}>
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Running
          </span>
          <span className="flex items-center gap-1.5" style={{ color: "var(--text-light-color)" }}>
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Initializing
          </span>
        </div>
      </div>

      <DataTable columns={columns} data={paginated} />

      <div className="pt-4 border-t border-gray-100">
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
