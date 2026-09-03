export default function StatCard({
  label,
  value,
  unit,
  delta,
  deltaSub,
  deltaPositive = true,
  deltaColor,
  icon,
  barPct,
  barColor = "bg-green-500",
}) {
  const deltaStyle = {
    primary: "var(--primary-color)",
    danger: "var(--danger-color)",
    info: "var(--tertiary-color)",
  };
  const resolvedDeltaColor =
    deltaColor && deltaStyle[deltaColor]
      ? deltaStyle[deltaColor]
      : deltaPositive
        ? "var(--primary-color)"
        : "var(--danger-color)";

  // Resolve dynamic icon background & icon color based on the barColor theme
  let iconThemeClasses = "bg-emerald-50 text-emerald-500";
  if (barColor.includes("blue") || barColor.includes("indigo")) {
    iconThemeClasses = "bg-blue-50 text-blue-500";
  } else if (barColor.includes("violet") || barColor.includes("purple") || barColor.includes("fuchsia")) {
    iconThemeClasses = "bg-violet-50 text-violet-500";
  } else if (barColor.includes("red") || barColor.includes("rose")) {
    iconThemeClasses = "bg-rose-50 text-rose-500";
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-sm h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-bold tracking-wide" style={{ color: "var(--text-light-color)" }}>
          {label}
        </p>
        {icon && (
          <span className={`flex h-9 w-9 items-center justify-center rounded-xl shrink-0 ${iconThemeClasses}`}>
            {icon}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-end gap-1.5">
        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-color)" }}>
          {value}
        </h2>
        {unit && (
          <span className="text-sm mb-1" style={{ color: "var(--text-light-color)" }}>
            {unit}
          </span>
        )}
      </div>

      {(delta || deltaSub) && (
        <p className="mt-2 text-sm">
          {delta && (
            <span className="font-semibold" style={{ color: resolvedDeltaColor }}>
              {delta}
            </span>
          )}
          {deltaSub && (
            <span className="ml-1" style={{ color: "var(--text-light-color)" }}>
              {deltaSub}
            </span>
          )}
        </p>
      )}

      {barPct != null && (
        <div className="mt-4 h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div className={`h-full ${barColor}`} style={{ width: `${barPct}%` }} />
        </div>
      )}
    </div>
  );
}
