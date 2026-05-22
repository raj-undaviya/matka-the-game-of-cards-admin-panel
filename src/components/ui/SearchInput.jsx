import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Search } from "lucide-react";

export default function SearchInput({
  placeholder = "Search...",
  value,
  onChange,
  className = "",
  fullWidth = true,
  size = "small",
}) {
  return (
    <TextField
      fullWidth={fullWidth}
      size={size}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search size={18} style={{ color: "var(--text-light-color)" }} />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "var(--background-light-color)",
        },
      }}
    />
  );
}
