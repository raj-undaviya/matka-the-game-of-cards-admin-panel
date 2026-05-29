import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Rocket, Server, X, Zap } from "lucide-react";

const regions = [
  "us-east-1 (N. Virginia)",
  "eu-central-1 (Frankfurt)",
  "ap-south-1 (Mumbai)",
  "us-west-2 (Oregon)",
];

const riskProfiles = ["LOW", "MEDIUM", "HIGH"];

export default function DeployInstanceModal({ open, onClose }) {
  const modalRef = useRef(null);
  const regionDropdownRef = useRef(null);
  const closeTimerRef = useRef(null);
  const closingRef = useRef(false);
  const [closing, setClosing] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [riskProfile, setRiskProfile] = useState("LOW");

  const requestClose = useCallback(() => {
    if (closingRef.current) return;

    setRegionOpen(false);
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
        if (regionOpen) {
          setRegionOpen(false);
          return;
        }

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
  }, [open, regionOpen, requestClose]);

  useEffect(() => {
    if (!regionOpen) return undefined;

    const handlePointerDown = (event) => {
      if (regionDropdownRef.current && !regionDropdownRef.current.contains(event.target)) {
        setRegionOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [regionOpen]);

  if (!open) return null;

  const handleOverlayMouseDown = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      requestClose();
    }
  };

  return (
    <div
      className={`deploy-modal-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/35 px-3 py-4 backdrop-blur-[6px] sm:px-6 ${closing ? "deploy-modal-overlay--closing" : ""
        }`}
      onMouseDown={handleOverlayMouseDown}
      role="presentation"
    >
      <style>{`
        .deploy-modal-overlay {
          animation: deployOverlayIn 180ms ease-out both;
        }
        .deploy-modal-overlay--closing {
          animation: deployOverlayOut 180ms ease-in both;
        }
        .deploy-modal-panel {
          animation: deployPanelIn 220ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .deploy-modal-overlay--closing .deploy-modal-panel {
          animation: deployPanelOut 180ms ease-in both;
        }
        @keyframes deployOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes deployOverlayOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes deployPanelIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes deployPanelOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(8px) scale(0.98); }
        }
      `}</style>
      
      <section
        ref={modalRef}
        className="deploy-modal-panel flex max-h-[calc(100vh-2rem)] w-full max-w-[700px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deploy-instance-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-7">
          <div className="flex min-w-0 items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
              <Rocket className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h2
                id="deploy-instance-title"
                className="text-xl font-extrabold leading-tight text-slate-950 sm:text-2xl"
              >
                Deploy New Arena Instance
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-600 sm:text-base">
                Configure parameters for immediate environment rollout.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={requestClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-500 transition-default hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close deploy instance modal"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <div className="overflow-y-auto px-5 py-6 sm:px-7 sm:py-8">
          <form className="space-y-7">
            <div>
              <label className="mb-3 block text-xs font-black uppercase tracking-widest text-slate-800">
                Arena Name
              </label>
              <input
                type="text"
                defaultValue="e.g. Phoenix-Sector-01"
                className="h-14 w-full rounded border border-slate-300 bg-white px-5 text-base font-medium text-slate-950 outline-none transition-default placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15"
              />
              <p className="mt-2 text-sm italic text-slate-700">
                Must be unique across the global cluster.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-3 block text-xs font-black uppercase tracking-widest text-slate-800">
                  Region Selection
                </label>
                <div className="relative" ref={regionDropdownRef}>
                  <button
                    type="button"
                    className={`flex h-14 w-full items-center justify-between rounded border bg-white px-5 text-left text-base font-medium text-slate-950 outline-none transition-default ${
                      regionOpen
                        ? "border-emerald-600 ring-2 ring-emerald-500/15"
                        : "border-slate-300 hover:border-emerald-500"
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={regionOpen}
                    onClick={() => setRegionOpen((current) => !current)}
                  >
                    <span className="min-w-0 truncate pr-4">{selectedRegion}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-600 transition-default ${
                        regionOpen ? "rotate-180 text-emerald-700" : ""
                      }`}
                    />
                  </button>

                  {regionOpen && (
                    <div
                      className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded border border-slate-200 bg-white shadow-2xl"
                      role="listbox"
                      aria-label="Region Selection"
                    >
                      {regions.map((region) => {
                        const selected = selectedRegion === region;

                        return (
                          <button
                            key={region}
                            type="button"
                            className={`flex min-h-12 w-full items-center px-5 py-3 text-left text-sm font-bold transition-default ${
                              selected
                                ? "bg-emerald-50 text-emerald-800"
                                : "bg-white text-slate-900 hover:bg-slate-50 hover:text-emerald-700"
                            }`}
                            role="option"
                            aria-selected={selected}
                            onClick={() => {
                              setSelectedRegion(region);
                              setRegionOpen(false);
                            }}
                          >
                            {region}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-xs font-black uppercase tracking-widest text-slate-800">
                  Max Player Capacity
                </label>
                <input
                  type="number"
                  defaultValue="1000"
                  className="h-14 w-full rounded border border-slate-300 bg-white px-5 text-base font-medium text-slate-950 outline-none transition-default focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15"
                />
              </div>
            </div>

            <div>
              <label className="mb-3 block text-xs font-black uppercase tracking-widest text-slate-800">
                Initial Liquidity Seed ($)
              </label>
              <div className="flex h-14 items-center rounded border border-slate-300 bg-white px-5 transition-default focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/15">
                <span className="mr-3 text-lg font-medium text-slate-900">$</span>
                <input
                  type="text"
                  defaultValue="50,000.00"
                  className="min-w-0 flex-1 bg-transparent text-base font-medium text-slate-950 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-3 block text-xs font-black uppercase tracking-widest text-slate-800">
                Risk Profile
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {riskProfiles.map((profile) => {
                  const selected = riskProfile === profile;
                  return (
                    <button
                      key={profile}
                      type="button"
                      onClick={() => setRiskProfile(profile)}
                      className={`h-12 rounded border text-sm font-black tracking-wide transition-default ${selected
                          ? "border-emerald-700 bg-emerald-50 text-emerald-800"
                          : "border-slate-300 bg-white text-slate-900 hover:border-emerald-500 hover:bg-emerald-50/50"
                        }`}
                    >
                      {profile}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4 rounded border border-slate-200 bg-slate-50 p-4">
              <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded bg-slate-950 text-slate-200 shadow-inner">
                <Server className="h-9 w-9" />
              </div>
              <div className="min-w-0 flex-1 py-1">
                <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Projected Resource Cost
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-950 sm:text-base">
                  Estimated $42.50 / hour operating cost in US-East region.
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[67%] rounded-full bg-emerald-700" />
                </div>
              </div>
            </div>
          </form>
        </div>

        <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-5 py-5 sm:flex-row sm:justify-end sm:px-7">
          <button
            type="button"
            onClick={requestClose}
            className="h-14 rounded border border-slate-300 bg-white px-8 text-base font-bold text-slate-800 transition-default hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex h-14 items-center justify-center gap-3 rounded bg-emerald-700 px-8 text-base font-extrabold text-white shadow-md transition-default hover:bg-emerald-800 hover:shadow-lg"
          >
            <Zap className="h-5 w-5 fill-white" />
            Deploy Instance
          </button>
        </footer>
      </section>
    </div>
  );
}
