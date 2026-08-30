export default function Button({
  children,
  variant = "primary",
  startIcon,
  endIcon,
  className = "",
  type = "button",
  disabled = false,
  ...props
}) {
  const baseClasses = "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-xs font-bold shadow-sm transition-all duration-200 cursor-pointer select-none focus:outline-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";
  
  const variantClasses = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-100/50",
    secondary: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-slate-100/50",
    ghost: "bg-transparent hover:bg-slate-50 text-slate-600 shadow-none border-none",
    blue: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100/50",
    purple: "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-100/50",
  };

  const selectedVariant = variantClasses[variant] || variantClasses.primary;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${selectedVariant} ${className}`}
      {...props}
    >
      {startIcon && <span className="flex items-center shrink-0">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center shrink-0">{endIcon}</span>}
    </button>
  );
}
