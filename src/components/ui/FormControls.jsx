import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

const baseControlClasses =
  "min-h-11 w-full rounded border border-slate-300 bg-white px-3 text-sm font-medium text-slate-950 outline-none transition-default placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15";

export function Field({ label, error, children }) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-700">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}

export function TextInput({ error, className = "", ...props }) {
  return (
    <input
      className={`${baseControlClasses} ${error ? "border-red-400 focus:border-red-500 focus:ring-red-500/15" : ""} ${className}`}
      {...props}
    />
  );
}

export function TextArea({ error, className = "", ...props }) {
  return (
    <textarea
      className={`${baseControlClasses} min-h-24 resize-y py-3 ${error ? "border-red-400 focus:border-red-500 focus:ring-red-500/15" : ""} ${className}`}
      {...props}
    />
  );
}

export function SelectInput({ error, children, className = "", ...props }) {
  return (
    <div className="relative">
      <select
        className={`${baseControlClasses} appearance-none pr-10 ${error ? "border-red-400 focus:border-red-500 focus:ring-red-500/15" : ""} ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
    </div>
  );
}

export function CustomDropdown({
  value,
  options,
  onChange,
  error,
  ariaLabel,
  className = "",
}) {
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={`${baseControlClasses} flex items-center justify-between gap-3 text-left ${
          open ? "border-emerald-600 ring-2 ring-emerald-500/15" : ""
        } ${error ? "border-red-400 focus:border-red-500 focus:ring-red-500/15" : ""}`}
      >
        <span className="min-w-0 truncate">{selectedOption.label}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-500 transition-default ${
            open ? "rotate-180 text-emerald-700" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl"
          role="listbox"
          aria-label={ariaLabel}
        >
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex min-h-11 w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm font-bold transition-default ${
                  selected
                    ? "bg-emerald-50 text-emerald-800"
                    : "bg-white text-slate-800 hover:bg-slate-50 hover:text-emerald-700"
                }`}
              >
                <span className="min-w-0 truncate">{option.label}</span>
                {selected && <Check className="h-4 w-4 shrink-0 text-emerald-700" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ToggleSwitch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex min-h-11 w-full items-center justify-between gap-4 rounded border border-slate-200 bg-slate-50 px-4 py-3 text-left transition-default hover:border-emerald-300 hover:bg-emerald-50/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
    >
      <span className="text-sm font-bold text-slate-800">{label}</span>
      <span
        className={`flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-default ${
          checked ? "bg-emerald-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white shadow-sm transition-default ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}

export function CheckboxField({ checked, onChange, label }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded border border-slate-200 bg-slate-50 px-4 py-3 transition-default hover:border-emerald-300 hover:bg-emerald-50/40">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-slate-300 text-emerald-600 accent-emerald-600 focus:ring-emerald-500"
      />
      <span className="text-sm font-bold text-slate-800">{label}</span>
    </label>
  );
}
