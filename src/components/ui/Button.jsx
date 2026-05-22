import MuiButton from "@mui/material/Button";

const variants = {
  primary: "contained",
  secondary: "outlined",
  ghost: "text",
};

export default function Button({
  children,
  variant = "primary",
  startIcon,
  endIcon,
  className = "",
  ...props
}) {
  const muiVariant = variants[variant] ?? "contained";
  const color = variant === "primary" ? "primary" : "inherit";

  return (
    <MuiButton
      variant={muiVariant}
      color={color}
      startIcon={startIcon}
      endIcon={endIcon}
      className={className}
      disableElevation
      {...props}
    >
      {children}
    </MuiButton>
  );
}
