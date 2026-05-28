export default function PageHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "var(--primary-color)" }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="text-xl sm:text-2xl font-bold break-words"
          style={{ color: "var(--text-color)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm md:text-base break-words" style={{ color: "var(--text-light-color)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex min-w-0 flex-wrap gap-3">{actions}</div>}
    </div>
  );
}
