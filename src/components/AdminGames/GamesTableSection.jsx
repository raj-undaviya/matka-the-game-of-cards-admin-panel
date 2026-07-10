import { useMemo, useState, useEffect } from "react";
import { Castle, Sun, Zap, Waves, Flame, Shield, Settings, Eye, Pencil, Trash, MoreVertical } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import LoadBar from "@/components/shared/LoadBar";
import TablePagination from "@/components/shared/TablePagination";
import ViewArenaModal from "@/components/AdminGames/ViewArenaModal";
import EditArenaModal from "@/components/AdminGames/EditArenaModal";
import ArenaSettingsModal from "@/components/AdminGames/ArenaSettingsModal";
import DeleteArenaConfirmModal from "@/components/AdminGames/DeleteArenaConfirmModal";
import useToast from "@/utils/useToast";
import {
  arenaInstances as mockArenas,
  GAMES_PAGE_SIZE,
} from "@/data/gamesData";

const iconMap = {
  castle: Castle,
  sun: Sun,
  zap: Zap,
  waves: Waves,
  flame: Flame,
  shield: Shield,
};

export default function GamesTableSection({ arenas }) {
  const [localArenas, setLocalArenas] = useState([]);
  const [page, setPage] = useState(1);
  const [jumpPage, setJumpPage] = useState("");
  const toast = useToast();

  // Menu anchor state
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const openMenu = Boolean(anchorEl);

  // Modal states
  const [selectedArena, setSelectedArena] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    if (arenas) {
      setLocalArenas(arenas);
    } else {
      setLocalArenas(mockArenas);
    }
  }, [arenas]);

  const pageCount = Math.max(1, Math.ceil(localArenas.length / GAMES_PAGE_SIZE));
  const paginated = useMemo(
    () => localArenas.slice((page - 1) * GAMES_PAGE_SIZE, page * GAMES_PAGE_SIZE),
    [localArenas, page]
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

  // Menu Click Handlers
  const handleMenuClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveRow(null);
  };

  // Simulated Action Handlers
  const handleEditSave = (updatedArena) => {
    setLocalArenas((prev) =>
      prev.map((a) => (a.id === updatedArena.id ? { ...a, ...updatedArena } : a))
    );
    toast.success(`Arena "${updatedArena.name}" updated successfully (simulated).`);
  };

  const handleSettingsSave = (arenaId, settings) => {
    toast.success("Settings applied successfully (simulated).");
  };

  const handleDeleteConfirm = (arenaId) => {
    const arenaToDelete = localArenas.find((a) => a.id === arenaId);
    setLocalArenas((prev) => prev.filter((a) => a.id !== arenaId));
    toast.success(`Arena instance "${arenaToDelete?.name || arenaId}" terminated successfully.`);
  };

  const columns = useMemo(() => [
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
                {row.id}
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
      align: "right",
      render: (_, row) => (
        <div className="flex justify-end pr-2">
          <IconButton
            size="small"
            aria-label={`Actions for ${row.id}`}
            aria-haspopup="true"
            onClick={(e) => handleMenuClick(e, row)}
          >
            <MoreVertical size={18} style={{ color: "var(--text-light-color)" }} />
          </IconButton>
        </div>
      ),
    },
  ], [localArenas]);

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

      {/* Action Dropdown Menu */}
      <Menu
        id="arena-actions-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            maxHeight: 200,
            width: "180px",
            borderRadius: "12px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            border: "1px solid var(--border-color)",
          },
        }}
        
      >
        <MenuItem
          onClick={() => {
            setSelectedArena(activeRow);
            setViewOpen(true);
            handleMenuClose();
          }}
          sx={{ fontSize: "14px", fontWeight: 500, display: "flex", gap: "10px", py: 1.5 }}
        >
          <Eye size={16} className="text-slate-500" />
          View Arena
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSelectedArena(activeRow);
            setSettingsOpen(true);
            handleMenuClose();
          }}
          sx={{ fontSize: "14px", fontWeight: 500, display: "flex", gap: "10px", py: 1.5 }}
        >
          <Settings size={16} className="text-slate-500" />
          Arena Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSelectedArena(activeRow);
            setEditOpen(true);
            handleMenuClose();
          }}
          sx={{ fontSize: "14px", fontWeight: 500, display: "flex", gap: "10px", py: 1.5 }}
        >
          <Pencil size={16} className="text-slate-500" />
          Edit Arena
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSelectedArena(activeRow);
            setDeleteOpen(true);
            handleMenuClose();
          }}
          sx={{ fontSize: "14px", fontWeight: 500, display: "flex", gap: "10px", py: 1.5, color: "#ef4444" }}
        >
          <Trash size={16} className="text-red-500" />
          Delete Arena
        </MenuItem>
      </Menu>

      <ViewArenaModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        arena={selectedArena}
      />

      <EditArenaModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        arena={selectedArena}
        onSave={handleEditSave}
      />

      <ArenaSettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        arena={selectedArena}
        onSave={handleSettingsSave}
      />

      <DeleteArenaConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        arena={selectedArena}
        onDelete={handleDeleteConfirm}
      />
    </div>
  );
}
