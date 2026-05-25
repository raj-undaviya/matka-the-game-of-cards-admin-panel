import { Clock, Eye, Pencil, Trash2 } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SectionCard from "@/components/shared/SectionCard";
import DataTable from "@/components/shared/DataTable";
import UserAvatar from "@/components/ui/UserAvatar";
import { policyVersionHistory } from "@/data/policiesData";

const columns = [
  { title: "VERSION", dataIndex: "version" },
  { title: "DOCUMENT", dataIndex: "document" },
  {
    title: "UPDATED BY",
    dataIndex: "updatedBy",
    render: (_, row) => (
      <div className="flex items-center gap-2">
        <UserAvatar initials={row.initials} size="sm" />
        <span className="font-medium">{row.updatedBy}</span>
      </div>
    ),
  },
  { title: "DATE", dataIndex: "date" },
  
  { title: "CHANGE SUMMARY", dataIndex: "summary" },

  {
    title: "ACTIONS",
    dataIndex: "id",
    render: (value, row) => (
      <div className="flex items-center gap-1">
        {/* View */}
        <Tooltip title="View version">
          <IconButton size="small" aria-label={`View ${value}`}>
            <Eye size={18} style={{ color: "var(--text-light-color)" }} />
          </IconButton>
        </Tooltip>

        {/* Edit */}
        <Tooltip title="Edit version">
          <IconButton
            size="small"
            aria-label={`Edit ${value}`}
            onClick={() => console.log("Edit", row)}
          >
            <Pencil size={18} style={{ color: "var(--primary-color)" }} />
          </IconButton>
        </Tooltip>

        {/* Delete */}
        <Tooltip title="Delete version">
          <IconButton
            size="small"
            aria-label={`Delete ${value}`}
            onClick={() => console.log("Delete", row)}
          >
            <Trash2 size={18} style={{ color: "#ef4444" }} />
          </IconButton>
        </Tooltip>
      </div>
    ),
  }
];

export default function PolicyVersionHistory() {
  return (
    <SectionCard
      title="Policy Version History"
      headerRight={
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm font-semibold shrink-0"
          style={{ color: "var(--tertiary-color)" }}
        >
          <Clock size={16} />
          View Detailed Audit Trail
        </button>
      }
      bodyClassName="pt-4"
    >
      <DataTable columns={columns} data={policyVersionHistory} />
    </SectionCard>
  );
}
