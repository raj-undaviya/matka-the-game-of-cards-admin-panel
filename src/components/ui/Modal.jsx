import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export default function Modal({
  open,
  title,
  description,
  children,
  footer,
  onClose,
  labelledBy = "modal-title",
  describedBy = "modal-description",
  maxWidth = "max-w-3xl",
}) {
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);
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

    previousFocusRef.current = document.activeElement;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPadding = document.body.style.paddingRight;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight =
      scrollbarWidth > 0 ? `${scrollbarWidth}px` : previousBodyPadding;

    window.requestAnimationFrame(() => {
      const firstFocusable = panelRef.current?.querySelector(focusableSelector);
      firstFocusable?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        requestClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll(focusableSelector),
      ).filter((element) => element.offsetParent !== null);

      if (focusableElements.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousBodyPadding;
      document.removeEventListener("keydown", handleKeyDown);
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }

      previousFocusRef.current?.focus?.();
    };
  }, [open, requestClose]);

  if (!open) return null;

  const handleOverlayPointerDown = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      requestClose();
    }
  };

  return createPortal(
    <div
      className={`admin-modal-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/40 px-3 py-4 backdrop-blur-[6px] sm:px-6 ${
        closing ? "admin-modal-overlay--closing" : ""
      }`}
      onMouseDown={handleOverlayPointerDown}
      role="presentation"
    >
      <style>{`
        .admin-modal-overlay {
          animation: adminModalOverlayIn 180ms ease-out both;
        }
        .admin-modal-overlay--closing {
          animation: adminModalOverlayOut 180ms ease-in both;
        }
        .admin-modal-panel {
          animation: adminModalPanelIn 220ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .admin-modal-overlay--closing .admin-modal-panel {
          animation: adminModalPanelOut 180ms ease-in both;
        }
        @keyframes adminModalOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes adminModalOverlayOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes adminModalPanelIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes adminModalPanelOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(8px) scale(0.98); }
        }
        @media (prefers-reduced-motion: reduce) {
          .admin-modal-overlay,
          .admin-modal-overlay--closing,
          .admin-modal-panel,
          .admin-modal-overlay--closing .admin-modal-panel {
            animation-duration: 1ms;
          }
        }
      `}</style>

      <section
        ref={panelRef}
        className={`admin-modal-panel flex max-h-[calc(100vh-2rem)] w-full ${maxWidth} flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl outline-none`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={description ? describedBy : undefined}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-6">
          <div className="min-w-0">
            <h2
              id={labelledBy}
              className="text-lg font-extrabold leading-tight text-slate-950 sm:text-xl"
            >
              {title}
            </h2>
            {description && (
              <p id={describedBy} className="mt-1 max-w-xl text-sm font-medium text-slate-600">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={requestClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-500 transition-default hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {children}
        </div>

        {footer && (
          <footer className="border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
            {footer}
          </footer>
        )}
      </section>
    </div>,
    document.body,
  );
}
