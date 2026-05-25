import { ShieldCheck, Ban, RotateCw } from "lucide-react";

export default function RecentMitigationActionsCard({ data = [] }) {
  // Helper to render icon and background based on mitigation type
  const renderMitigationIcon = (type) => {
    switch (type) {
      case "success":
        return (
          <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
        );
      case "danger":
        return (
          <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Ban className="h-5 w-5" />
          </div>
        );
      case "warning":
        return (
          <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <RotateCw className="h-4 w-4" />
          </div>
        );
      default:
        return (
          <div className="h-10 w-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-6">
          Recent Mitigation Actions
        </h3>

        <div className="space-y-4">
          {data.map((action) => (
            <div
              key={action.id}
              className="flex items-start gap-4 p-2 rounded-xl hover:bg-slate-50 transition-colors duration-150"
            >
              {renderMitigationIcon(action.type)}
              
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold text-slate-800 truncate">
                  {action.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {action.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
