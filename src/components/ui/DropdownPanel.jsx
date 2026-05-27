import { cloneElement, useEffect, useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";



// Centralized dropdown/popup primitive for admin chrome.
// Goals:
// - consistent click-outside behavior
// - consistent Escape handling
// - consistent mobile backdrop + body scroll lock
// - consistent z-index + positioning rules

function useBodyScrollLock(locked) {
    useEffect(() => {
        if (!locked) return;

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const prevOverflow = document.body.style.overflow;
        const prevPaddingRight = document.body.style.paddingRight;

        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
            document.body.style.overflow = prevOverflow;
            document.body.style.paddingRight = prevPaddingRight;
        };
    }, [locked]);
}

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onOpenChange
 * @param {React.ReactNode} props.children Panel content
 * @param {React.ReactNode} props.trigger Trigger element (rendered via clone element)
 * @param {'bottom-right'|'top-right'} props.desktopPlacement
 * @param {'bottom-sheet'|'floating'} props.mobilePlacement
 * @param {string} props.panelClassName
 */
export default function DropdownPanel({
    open,
    onOpenChange,
    children,
    trigger,
    desktopPlacement = "bottom-right",
    mobilePlacement = "bottom-sheet",
    panelClassName = "",
}) {
    const panelRef = useRef(null);

    useClickOutside(panelRef, () => {
        if (open) onOpenChange?.(false);
    });

    useBodyScrollLock(!!open);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e) => {
            if (e.key === "Escape") onOpenChange?.(false);
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, onOpenChange]);

    const placementStyles = (() => {
        // Consistent placement rules:
        // Desktop: absolute anchor behavior (top-full / right-0)
        // Mobile: fixed panel with max height
        if (desktopPlacement === "top-right") {
            return {
                desktop: "sm:absolute sm:right-0 sm:bottom-full sm:mb-4",
            };
        }

        return {
            desktop: "sm:absolute sm:right-0 sm:top-full sm:mt-4",
        };
    })();

    const mobileStyles = (() => {
        if (mobilePlacement === "floating") {
            return {
                mobile: "sm:hidden fixed inset-x-3 bottom-3 top-auto",
            };
        }

        // default: bottom sheet
        return {
            mobile:
                "sm:hidden fixed left-0 right-0 bottom-0 top-auto mx-2 mb-3",
        };
    })();

    if (!trigger) {
        throw new Error("DropdownPanel requires a `trigger` prop.");
    }

    // We rely on the passed trigger element accepting onClick.
    // We clone it to avoid wrapper div interfering with layout.
    const triggerEl = (() => {
        // Clone so we avoid extra wrappers that may affect layout.
        return cloneElement(trigger, {
            "aria-haspopup": "menu",
            "aria-expanded": open,
            onClick: (e) => {
                trigger.props?.onClick?.(e);
                onOpenChange?.(!open);
            },
        });
    })();

    return (
        <div className="relative" ref={panelRef}>
            {triggerEl}

            {open && (
                <div
                    className="sm:hidden fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px]"
                    onClick={() => onOpenChange?.(false)}
                    aria-hidden
                />
            )}

            {open && (
                <div
                    className={`
            z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden
            fixed
            ${mobileStyles.mobile}
            ${placementStyles.desktop}
            w-auto sm:w-[380px]
            max-h-[calc(100vh-6rem)] overflow-y-auto
            animate-in fade-in zoom-in duration-200
            ${panelClassName}
          `}
                    role="menu"
                >
                    {children}
                </div>
            )}
        </div>
    );
}

