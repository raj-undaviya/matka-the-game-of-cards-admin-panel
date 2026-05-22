import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Eye, Ban } from "lucide-react";

export default function UsersTableActions({ userId }) {
  return (
    <div className="flex items-center gap-1">
      <Tooltip title="View player">
        <IconButton size="small" aria-label={`View ${userId}`}>
          <Eye size={18} style={{ color: "var(--text-light-color)" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Restrict player">
        <IconButton size="small" aria-label={`Restrict ${userId}`}>
          <Ban size={18} style={{ color: "var(--danger-color)" }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
