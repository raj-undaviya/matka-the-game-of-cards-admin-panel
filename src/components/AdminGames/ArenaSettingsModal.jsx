import { useCallback, useEffect, useRef, useState } from "react";
import { X, Settings, Check } from "lucide-react";

export default function ArenaSettingsModal({ open, onClose, arena, onSave }) {
  const modalRef = useRef(null);
  const closeTimerRef = useRef(null);
  const closingRef = useRef(false);
  
  const [closing, setClosing] = useState(false);
  const [minBet, setMinBet] = useState(10);
  const [maxBet, setMaxBet] = useState(10000);
  const [commission, setCommission] = useState(2.5);
  const [autoScale, setAutoScale] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowAnonymous, setAllowAnonymous] = useState(false);

  // Initialize form when modal opens
  useEffect(() => {
    if (arena && open) {
      // Set some mock initial values, or load if they exist on the arena object
      setMinBet(arena.minBet || 10);
      setMaxBet(arena.maxBet || 10000);
      setCommission(arena.commission || 2.5);
      setAutoScale(arena.autoScale !== undefined ? arena.autoScale : true);
      setMaintenanceMode(arena.maintenanceMode !== undefined ? arena.maintenanceMode : false);
      setAllowAnonymous(arena.allowAnonymous !== undefined ? arena.allowAnonymous : false);
    }
  }, [arena, open]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.(arena.id, {
      minBet,
      maxBet,
      commission,
      autoScale,
      maintenanceMode,
      allowAnonymous,
    });
    requestClose();
  };

  return (
    <div
      className={`settings-modal-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/35 px-3 py-4 backdrop-blur-[6px] sm:px-6 ${
        closing ? "settings-modal-overlay--closing" : ""
      }`}
      onMouseDown={handleOverlayMouseDown}
      role="presentation"
    >
      <style>{`
        .settings-modal-overlay {
          animation: settingsOverlayIn 180ms ease-out both;
        }
        .settings-modal-overlay--closing {
          animation: settingsOverlayOut 180ms ease-in both;
        }
        .settings-modal-panel {
          animation: settingsPanelIn 220ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .settings-modal-overlay--closing .settings-modal-panel {
          animation: settingsPanelOut 180ms ease-in both;
        }
        @keyframes settingsOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes settingsOverlayOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes settingsPanelIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes settingsPanelOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(8px) scale(0.98); }
        }
      `}</style>

      <section
        ref={modalRef}
        className="settings-modal-panel flex max-h-[calc(100vh-2rem)] w-full max-w-[650px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-arena-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-7">
          <div className="flex min-w-0 items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-purple-50 text-purple-700">
              <Settings className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h2
                id="settings-arena-title"
                className="text-xl font-extrabold leading-tight text-slate-950 sm:text-2xl"
              >
                Arena Settings
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Configure limits and policies for {arena.name}.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={requestClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-500 transition-default hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close settings modal"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <div className="overflow-y-auto px-5 py-6 sm:px-7 sm:py-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Bet Limits Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">
                Betting Parameters
              </h3>
              
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Min Bet Limit ($)
                  </label>
                  <input
                    type="number"
                    value={minBet}
                    onChange={(e) => setMinBet(parseInt(e.target.value, 10) || 0)}
                    className="h-11 w-full rounded border border-slate-300 bg-white px-4 text-sm font-medium text-slate-950 outline-none transition-default focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Max Bet Limit ($)
                  </label>
                  <input
                    type="number"
                    value={maxBet}
                    onChange={(e) => setMaxBet(parseInt(e.target.value, 10) || 0)}
                    className="h-11 w-full rounded border border-slate-300 bg-white px-4 text-sm font-medium text-slate-950 outline-none transition-default focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  House Commission Fee (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={commission}
                  onChange={(e) => setCommission(parseFloat(e.target.value) || 0)}
                  className="h-11 w-full rounded border border-slate-300 bg-white px-4 text-sm font-medium text-slate-950 outline-none transition-default focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Operational Policies Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">
                Operational Policies
              </h3>

              <div className="space-y-4">
                {/* Auto Scale Toggle */}
                <div className="flex items-center justify-between">
                  <div className="pr-4">
                    <p className="text-sm font-bold text-slate-900">Auto-Scale Instances</p>
                    <p className="text-xs text-slate-500">Automatically spin up additional nodes during high concurrent loads.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAutoScale(!autoScale)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      autoScale ? "bg-emerald-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        autoScale ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Maintenance Mode Toggle */}
                <div className="flex items-center justify-between">
                  <div className="pr-4">
                    <p className="text-sm font-bold text-slate-900">Maintenance Mode</p>
                    <p className="text-xs text-slate-500">Temporarily prevent new players from joining this arena.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMaintenanceMode(!maintenanceMode)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      maintenanceMode ? "bg-amber-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        maintenanceMode ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Allow Anonymous Players Toggle */}
                <div className="flex items-center justify-between">
                  <div className="pr-4">
                    <p className="text-sm font-bold text-slate-900">Allow Anonymous Players</p>
                    <p className="text-xs text-slate-500">Permit guests to play in watch/demo mode without KYC verification.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAllowAnonymous(!allowAnonymous)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      allowAnonymous ? "bg-emerald-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        allowAnonymous ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="hidden" />
          </form>
        </div>

        <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
          <button
            type="button"
            onClick={requestClose}
            className="h-12 rounded border border-slate-300 bg-white px-6 text-sm font-bold text-slate-800 transition-default hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex h-12 items-center justify-center gap-2 rounded bg-emerald-700 px-6 text-sm font-bold text-white shadow-md transition-default hover:bg-emerald-800 hover:shadow-lg"
          >
            <Check className="h-4 w-4" />
            Apply Settings
          </button>
        </footer>
      </section>
    </div>
  );
}
