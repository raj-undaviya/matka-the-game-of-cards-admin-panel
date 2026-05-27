import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

export default function TopbarSearch({ onExpandedChange }) {
  const [expanded, setExpanded] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const isGlass = expanded || focused;

  useEffect(() => {
    if (!expanded) return;

    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setExpanded(false);
        setFocused(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setExpanded(false);
        setFocused(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [expanded]);

  useEffect(() => {
    if (expanded) inputRef.current?.focus();
  }, [expanded]);

  useEffect(() => {
    onExpandedChange?.(expanded);
  }, [expanded, onExpandedChange]);

  const handleExpand = () => {
    setExpanded(true);
  };

  const handleCollapse = () => {
    setExpanded(false);
    setFocused(false);
    inputRef.current?.blur();
  };

  return (
    <>
    {expanded && (
      <div
        className="md:hidden fixed inset-0 top-16 z-40 bg-slate-900/15 backdrop-blur-[3px]"
        aria-hidden
        onClick={handleCollapse}
      />
    )}
    <div
      ref={wrapperRef}
      className={`
        relative flex items-center min-w-0 transition-all duration-300 ease-out
        md:flex-1
        ${expanded ? "flex-1 z-50 max-md:absolute max-md:left-0 max-md:right-0 max-md:top-0 max-md:bottom-0 max-md:px-4" : "max-md:w-10"}
      `}
    >
      {/* Mobile: collapsed search icon */}
      {!expanded && (
        <button
          type="button"
          onClick={handleExpand}
          aria-label="Open search"
          className="md:hidden h-10 w-10 rounded-lg grid place-items-center shrink-0 transition-default"
          style={{ color: "var(--text-light-color)" }}
        >
          <Search className="h-5 w-5" />
        </button>
      )}

      {/* Search field — hidden on mobile until expanded */}
      <div
        className={`
          relative w-full transition-all duration-300 ease-out
          ${expanded ? "max-md:opacity-100 max-md:scale-100 max-md:pointer-events-auto" : "max-md:opacity-0 max-md:scale-95 max-md:pointer-events-none max-md:w-0 max-md:overflow-hidden"}
          md:opacity-100 md:scale-100 md:pointer-events-auto
        `}
      >
        <div
          className={`glass-search rounded-xl transition-default ${isGlass ? "glass-search--active" : ""}`}
        >
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 z-10 pointer-events-none"
            style={{ color: isGlass ? "var(--primary-color)" : "var(--text-light-color)" }}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search players, transactions, or IDs..."
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full h-11 rounded-xl pl-11 pr-10 text-sm outline-none bg-transparent relative z-1"
            style={{ color: "var(--text-color)" }}
          />
          {expanded && (
            <button
              type="button"
              onClick={handleCollapse}
              aria-label="Close search"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 md:hidden h-7 w-7 rounded-lg grid place-items-center"
              style={{ color: "var(--text-light-color)" }}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

    </div>
    </>
  );
}
