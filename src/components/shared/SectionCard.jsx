export default function SectionCard({
  title,
  icon: Icon,
  headerRight,
  children,
  className = "",
  bodyClassName = "",
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 shadow-sm ${className}`}
    >
      {(title || headerRight) && (
        <div
          className="flex items-center justify-between gap-3 px-6 py-4 border-b border-gray-100"
        >
          <div className="flex items-center gap-2 min-w-0">
            {Icon && (
              <Icon size={20} className="shrink-0" style={{ color: "var(--primary-color)" }} />
            )}
            {title && (
              <h3 className="text-lg font-semibold truncate" style={{ color: "var(--text-color)" }}>
                {title}
              </h3>
            )}
          </div>
          {headerRight}
        </div>
      )}
      <div className={`p-6 ${bodyClassName}`}>{children}</div>
    </div>
  );
}
