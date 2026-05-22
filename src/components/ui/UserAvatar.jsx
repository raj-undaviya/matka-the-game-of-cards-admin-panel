export default function UserAvatar({ initials, size = "md" }) {
  const sizeClass = size === "sm" ? "h-9 w-9 text-xs" : "h-10 w-10 text-sm";

  return (
    <span
      className={`${sizeClass} rounded-full flex items-center justify-center font-bold shrink-0`}
      style={{
        backgroundColor: "var(--primary-light-color)",
        color: "var(--primary-color)",
      }}
    >
      {initials}
    </span>
  );
}
