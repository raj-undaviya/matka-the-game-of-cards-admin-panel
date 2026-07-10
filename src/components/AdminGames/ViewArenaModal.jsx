import { useCallback, useEffect, useRef, useState } from "react";
import { X, Eye, ShieldAlert, Cpu } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import LoadBar from "@/components/shared/LoadBar";

export default function ViewArenaModal({ open, onClose, arena }) {
  const modalRef = useRef(null);
  const closeTimerRef = useRef(null);
  const closingRef = useRef(false);
  const [closing, setClosing] = useState(false);

  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      closingRef.current = false;
      setClosing(false);
      onClose?.();
    }, 180);
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : previousPaddingRight;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        requestClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      document.removeEventListener("keydown", handleKeyDown);
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, [open, requestClose]);

  if (!open || !arena) return null;

  const handleOverlayMouseDown = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      requestClose();
    }
  };

  // Derive region and risk profile if not present
  const derivedRegion = arena.region || (arena.id?.startsWith("SR") ? "EU-CENTRAL-1" : arena.id?.startsWith("NF") ? "AP-SOUTH-1" : "US-EAST-1");
  const derivedRisk = arena.riskProfile || (arena.load > 75 ? "HIGH" : arena.load > 40 ? "MEDIUM" : "LOW");
  const riskColor = derivedRisk === "HIGH" ? "text-red-600 bg-red-50 border-red-200" : derivedRisk === "MEDIUM" ? "text-amber-600 bg-amber-50 border-amber-200" : "text-emerald-600 bg-emerald-50 border-emerald-200";

  return (
    <div
      className={`view-modal-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/35 px-3 py-4 backdrop-blur-[6px] sm:px-6 ${
        closing ? "view-modal-overlay--closing" : ""
      }`}
      onMouseDown={handleOverlayMouseDown}
      role="presentation"
    >
      <style>{`
        .view-modal-overlay {
          animation: viewOverlayIn 180ms ease-out both;
        }
        .view-modal-overlay--closing {
          animation: viewOverlayOut 180ms ease-in both;
        }
        .view-modal-panel {
          animation: viewPanelIn 220ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .view-modal-overlay--closing .view-modal-panel {
          animation: viewPanelOut 180ms ease-in both;
        }
        @keyframes viewOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes viewOverlayOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes viewPanelIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes viewPanelOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(8px) scale(0.98); }
        }
      `}</style>

      <section
        ref={modalRef}
        className="view-modal-panel flex max-h-[calc(100vh-2rem)] w-full max-w-[600px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="view-arena-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-7">
          <div className="flex min-w-0 items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
              <Eye className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h2
                id="view-arena-title"
                className="text-xl font-extrabold leading-tight text-slate-950 sm:text-2xl"
              >
                Arena Details
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Instance ID: {arena.id}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={requestClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-500 transition-default hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close view arena modal"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <div className="overflow-y-auto px-5 py-6 sm:px-7 sm:py-8 space-y-6">
          {/* General Information Card */}
          <div className="rounded-xl border border-slate-200 p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">General Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">Arena Name</p>
                <p className="text-base font-bold text-slate-950">{arena.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Status</p>
                <div className="mt-1">
                  <StatusBadge type={arena.status.toLowerCase()} label={arena.status} />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Pool Size</p>
                <p className="text-base font-bold text-slate-950">{arena.poolSize}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Investors count</p>
                <p className="text-base font-bold text-slate-950">{arena.investors.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Infrastructure & Load */}
          <div className="rounded-xl border border-slate-200 p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Deployment & Metrics</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500">Deployment Region</p>
                  <p className="text-sm font-bold text-slate-950 flex items-center gap-1.5 mt-0.5">
                    <Cpu className="h-4 w-4 text-slate-500" />
                    {derivedRegion}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Risk Profile</p>
                  <span className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-bold mt-1 ${riskColor}`}>
                    <ShieldAlert className="h-3 w-3 mr-1" />
                    {derivedRisk}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1.5">
                  <span>Current Load</span>
                  <span className="font-bold text-slate-900">{arena.load}%</span>
                </div>
                <LoadBar value={arena.load} />
              </div>
            </div>
          </div>
        </div>

        <footer className="border-t border-slate-200 bg-slate-50 px-5 py-4 flex justify-end sm:px-7">
          <button
            type="button"
            onClick={requestClose}
            className="h-11 rounded border border-slate-300 bg-white px-6 text-sm font-bold text-slate-800 transition-default hover:bg-slate-100"
          >
            Close
          </button>
        </footer>
      </section>
    </div>
  );
}
