export default function PageHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        {eyebrow && (
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "var(--primary-color)" }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="text-2xl md:text-2xl font-bold"
          style={{ color: "var(--text-color)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm md:text-base" style={{ color: "var(--text-light-color)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}
