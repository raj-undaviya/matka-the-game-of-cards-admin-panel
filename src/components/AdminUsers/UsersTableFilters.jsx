import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import SearchInput from "@/components/ui/SearchInput";

export default function UsersTableFilters({
  statusFilter,
  kycFilter,
  statusOptions,
  kycOptions,
  onStatusChange,
  onKycChange,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
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

      <div className="flex items-center gap-3 w-full md:w-auto">
        <SearchInput
          placeholder="Search players..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="min-w-0 flex-1 md:w-60"
        />
        
        <FormControl size="small" sx={{ minWidth: 160 }} className="shrink-0">
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
    </div>
  );
}
