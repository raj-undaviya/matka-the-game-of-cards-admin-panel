import { Lock, User, Pencil } from "lucide-react";
import { recentAdminActions } from "@/data/usersData";

const iconMap = {
  lock: Lock,
  user: User,
  edit: Pencil,
};

export default function RecentAdminActions() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-full">
      <h3 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>
        Recent Admin Actions
      </h3>
      <p className="text-sm mt-1" style={{ color: "var(--text-light-color)" }}>
        Audit log of platform moderation activity
      </p>

      <ul className="mt-5 space-y-4">
        {recentAdminActions.map((action) => {
          const Icon = iconMap[action.icon] ?? User;
          return (
            <li
              key={action.id}
              className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: "var(--background-light-color)",
                  color: "var(--text-light-color)",
                }}
              >
                <Icon size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium" style={{ color: "var(--text-color)" }}>
                  {action.description}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-light-color)" }}>
                  {action.reason}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--text-light-color)" }}>
                  {action.time}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
