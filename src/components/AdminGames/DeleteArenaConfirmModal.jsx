import { useCallback, useEffect, useRef, useState } from "react";
import { X, Trash, AlertTriangle } from "lucide-react";

export default function DeleteArenaConfirmModal({ open, onClose, arena, onDelete }) {
  const modalRef = useRef(null);
  const closeTimerRef = useRef(null);
  const closingRef = useRef(false);
  
  const [closing, setClosing] = useState(false);
  const [confirmName, setConfirmName] = useState("");

  // Clear confirm field when opening/closing
  useEffect(() => {
    if (open) {
      setConfirmName("");
    }
  }, [open]);

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
    if (confirmName.trim().toLowerCase() !== arena.name.trim().toLowerCase()) return;
    onDelete?.(arena.id);
    requestClose();
  };

  const isConfirmed = confirmName.trim().toLowerCase() === arena.name.trim().toLowerCase();

  return (
    <div
      className={`delete-modal-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/35 px-3 py-4 backdrop-blur-[6px] sm:px-6 ${
        closing ? "delete-modal-overlay--closing" : ""
      }`}
      onMouseDown={handleOverlayMouseDown}
      role="presentation"
    >
      <style>{`
        .delete-modal-overlay {
          animation: deleteOverlayIn 180ms ease-out both;
        }
        .delete-modal-overlay--closing {
          animation: deleteOverlayOut 180ms ease-in both;
        }
        .delete-modal-panel {
          animation: deletePanelIn 220ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .delete-modal-overlay--closing .delete-modal-panel {
          animation: deletePanelOut 180ms ease-in both;
        }
        @keyframes deleteOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes deleteOverlayOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes deletePanelIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes deletePanelOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(8px) scale(0.98); }
        }
      `}</style>

      <section
        ref={modalRef}
        className="delete-modal-panel flex max-h-[calc(100vh-2rem)] w-full max-w-[500px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-arena-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-7">
          <div className="flex min-w-0 items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-red-50 text-red-700">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h2
                id="delete-arena-title"
                className="text-xl font-extrabold leading-tight text-slate-950"
              >
                Delete Arena Instance
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-600">
                This action is destructive and irreversible.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={requestClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-500 transition-default hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close delete modal"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <div className="overflow-y-auto px-5 py-6 sm:px-7 space-y-4">
          <div className="rounded-lg border border-red-200 bg-red-50/50 p-4">
            <p className="text-sm font-medium text-red-800 leading-relaxed">
              Are you sure you want to terminate and delete <strong>{arena.name}</strong> ({arena.id})? 
              This will immediately drop all player connections, settle current active card tables, 
              and decommission the node resources.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Type the arena name <span className="font-extrabold text-red-600">"{arena.name}"</span> to confirm:
            </label>
            <input
              type="text"
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
              placeholder="Enter arena name"
              className="h-11 w-full rounded border border-slate-300 bg-white px-4 text-sm font-medium text-slate-950 outline-none transition-default focus:border-red-600 focus:ring-2 focus:ring-red-500/10"
            />
          </div>
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
            disabled={!isConfirmed}
            className="inline-flex h-12 items-center justify-center gap-2 rounded bg-red-600 px-6 text-sm font-bold text-white shadow-md transition-default hover:bg-red-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash className="h-4 w-4" />
            Terminate Instance
          </button>
        </footer>
      </section>
    </div>
  );
}
