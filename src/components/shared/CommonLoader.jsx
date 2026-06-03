import useGlobalApiLoading from "@/hooks/useGlobalApiLoading";

export default function CommonLoader({ message = "Loading data..." }) {
  const { isLoading } = useGlobalApiLoading();

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] grid place-items-center bg-slate-950/20 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="flex min-w-64 flex-col items-center gap-4 rounded-2xl border border-emerald-100 bg-white px-8 py-7 shadow-2xl">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-100" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-600 animate-spin" />
          <div className="absolute inset-3 rounded-full bg-emerald-50" />
        </div>
        <div className="text-center">
          <p className="text-sm font-extrabold text-slate-900">{message}</p>
          <p className="mt-1 text-xs font-semibold text-slate-500">Please wait while the latest information loads.</p>
        </div>
      </div>
    </div>
  );
}
