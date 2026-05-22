const STATUS_STYLES = {
  active: "bg-green-100 text-green-700",
  completed: "bg-green-100 text-green-700",
  verified: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  unverified: "bg-gray-100 text-gray-600",
  flagged: "bg-red-100 text-red-700",
  restricted: "bg-red-100 text-red-700",
  banned: "bg-red-100 text-red-700",
  maintenance: "bg-orange-100 text-orange-700",
  live: "bg-green-100 text-green-700",
  running: "bg-green-100 text-green-700",
  initializing: "bg-blue-100 text-blue-700",
  closed: "bg-gray-100 text-gray-600",
  healthy: "bg-green-100 text-green-700",
  warming: "bg-blue-100 text-blue-700",
  offline: "bg-gray-100 text-gray-600",
};

export default function StatusBadge({ type, label }) {
  const key = (type ?? "").toLowerCase();
  const style = STATUS_STYLES[key] ?? "bg-gray-100 text-gray-600";
  const text = label ?? type;

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${style}`}>
      {text}
    </span>
  );
}
