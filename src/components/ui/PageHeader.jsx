export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1
          className="text-2xl md:text-3xl font-bold"
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
