import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

export default function UsersTableFilters({
  statusFilter,
  kycFilter,
  statusOptions,
  kycOptions,
  onStatusChange,
  onKycChange,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-5">
      <div className="flex gap-2 flex-wrap">
        {statusOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onStatusChange(option)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-default"
            style={{
              backgroundColor:
                statusFilter === option ? "var(--primary-light-color)" : "transparent",
              color: statusFilter === option ? "var(--primary-color)" : "var(--text-light-color)",
              border: `1px solid ${statusFilter === option ? "var(--primary-color)" : "var(--border-color)"}`,
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <Select
          value={kycFilter}
          onChange={(e) => onKycChange(e.target.value)}
          sx={{ borderRadius: 2, fontSize: "0.875rem" }}
        >
          {kycOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
