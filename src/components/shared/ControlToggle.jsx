import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function ControlToggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-gray-100 last:border-0 last:pb-0 first:pt-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold" style={{ color: "var(--text-color)" }}>
          {label}
        </p>
        {description && (
          <p className="text-xs mt-0.5" style={{ color: "var(--text-light-color)" }}>
            {description}
          </p>
        )}
      </div>
      <FormControlLabel
        control={
          <Switch checked={checked} onChange={onChange} color="primary" size="small" />
        }
        label=""
        sx={{ m: 0 }}
      />
    </div>
  );
}
