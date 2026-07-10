import { useCallback, useEffect, useRef, useState } from "react";
import { X, Pencil, ChevronDown, Check } from "lucide-react";

const regions = [
  "us-east-1 (N. Virginia)",
  "eu-central-1 (Frankfurt)",
  "ap-south-1 (Mumbai)",
  "us-west-2 (Oregon)",
];

const statuses = ["RUNNING", "INITIALIZING", "CLOSED"];
const riskProfiles = ["LOW", "MEDIUM", "HIGH"];

export default function EditArenaModal({ open, onClose, arena, onSave }) {
  const modalRef = useRef(null);
  const regionDropdownRef = useRef(null);
  const closeTimerRef = useRef(null);
  const closingRef = useRef(false);
  
  const [closing, setClosing] = useState(false);
  const [arenaName, setArenaName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [regionOpen, setRegionOpen] = useState(false);
  const [maxPlayers, setMaxPlayers] = useState(1000);
  const [status, setStatus] = useState("RUNNING");
  const [riskProfile, setRiskProfile] = useState("LOW");

  // Load arena data when modal opens
  useEffect(() => {
    if (arena && open) {
      setArenaName(arena.name || "");
      
      const derivedRegion = arena.region || (arena.id?.startsWith("SR") ? "EU-CENTRAL-1" : arena.id?.startsWith("NF") ? "AP-SOUTH-1" : "US-EAST-1");
      const matchedRegion = regions.find(r => r.toUpperCase().startsWith(derivedRegion.toUpperCase())) || regions[0];
      setSelectedRegion(matchedRegion);
      
      setStatus(arena.status || "RUNNING");
      
      const derivedRisk = arena.riskProfile || (arena.load > 75 ? "HIGH" : arena.load > 40 ? "MEDIUM" : "LOW");
      setRiskProfile(derivedRisk);
      
      setMaxPlayers(arena.maxPlayers || 1000);
    }
  }, [arena, open]);

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

  if (!open || !arena) return null;

  const handleOverlayMouseDown = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      requestClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!arenaName.trim()) return;

    const regionCode = selectedRegion.split(" ")[0].toUpperCase();
    onSave?.({
      ...arena,
      name: arenaName,
      status,
      region: regionCode,
      riskProfile,
      maxPlayers,
    });
    requestClose();
  };

  return (
    <div
      className={`edit-modal-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/35 px-3 py-4 backdrop-blur-[6px] sm:px-6 ${
        closing ? "edit-modal-overlay--closing" : ""
      }`}
      onMouseDown={handleOverlayMouseDown}
      role="presentation"
    >
      <style>{`
        .edit-modal-overlay {
          animation: editOverlayIn 180ms ease-out both;
        }
        .edit-modal-overlay--closing {
          animation: editOverlayOut 180ms ease-in both;
        }
        .edit-modal-panel {
          animation: editPanelIn 220ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .edit-modal-overlay--closing .edit-modal-panel {
          animation: editPanelOut 180ms ease-in both;
        }
        @keyframes editOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes editOverlayOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes editPanelIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes editPanelOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(8px) scale(0.98); }
        }
      `}</style>

      <section
        ref={modalRef}
        className="edit-modal-panel flex max-h-[calc(100vh-2rem)] w-full max-w-[650px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-arena-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-7">
          <div className="flex min-w-0 items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-700">
              <Pencil className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h2
                id="edit-arena-title"
                className="text-xl font-extrabold leading-tight text-slate-950 sm:text-2xl"
              >
                Edit Arena Instance
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Modify parameters for {arena.id} ({arena.name}).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={requestClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-500 transition-default hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close edit arena modal"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <div className="overflow-y-auto px-5 py-6 sm:px-7 sm:py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
                Arena Name
              </label>
              <input
                type="text"
                value={arenaName}
                onChange={(e) => setArenaName(e.target.value)}
                required
                className="h-12 w-full rounded border border-slate-300 bg-white px-4 text-base font-medium text-slate-950 outline-none transition-default focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
                  Region Selection
                </label>
                <div className="relative" ref={regionDropdownRef}>
                  <button
                    type="button"
                    className={`flex h-12 w-full items-center justify-between rounded border bg-white px-4 text-left text-base font-medium text-slate-950 outline-none transition-default ${
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
                    >
                      {regions.map((region) => {
                        const selected = selectedRegion === region;

                        return (
                          <button
                            key={region}
                            type="button"
                            className={`flex min-h-10 w-full items-center px-4 py-2 text-left text-sm font-bold transition-default ${
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
                <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="h-12 w-full rounded border border-slate-300 bg-white px-4 text-base font-medium text-slate-950 outline-none transition-default focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
                  Max Player Capacity
                </label>
                <input
                  type="number"
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(parseInt(e.target.value, 10) || 0)}
                  className="h-12 w-full rounded border border-slate-300 bg-white px-4 text-base font-medium text-slate-950 outline-none transition-default focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
                  Risk Profile
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {riskProfiles.map((profile) => {
                    const selected = riskProfile === profile;
                    return (
                      <button
                        key={profile}
                        type="button"
                        onClick={() => setRiskProfile(profile)}
                        className={`h-12 rounded border text-xs font-bold transition-default ${
                          selected
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
            disabled={!arenaName.trim()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded bg-emerald-700 px-6 text-sm font-bold text-white shadow-md transition-default hover:bg-emerald-800 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="h-4 w-4" />
            Save Changes
          </button>
        </footer>
      </section>
    </div>
  );
}
