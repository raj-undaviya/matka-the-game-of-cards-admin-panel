export default function CalloutBox({ title, children }) {
  return (
    <div
      className="rounded-lg border-l-4 p-4 my-5"
      style={{
        backgroundColor: "var(--primary-light-color)",
        borderLeftColor: "var(--primary-color)",
      }}
    >
      {title && (
        <p className="text-sm font-bold mb-1" style={{ color: "var(--primary-color)" }}>
          {title}
        </p>
      )}
      <div className="text-sm leading-relaxed" style={{ color: "var(--text-color)" }}>
        {children}
      </div>
    </div>
  );
}
