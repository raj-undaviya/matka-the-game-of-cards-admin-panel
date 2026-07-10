import { useState, useRef, useEffect, useCallback } from "react";
import { X, Trophy, Plus } from "lucide-react";
import gamesApi from "@/api/gamesApi";
import useToast from "@/utils/useToast";

const variations = [
  { value: "V1", label: "V1 - Single" },
  { value: "V2", label: "V2 - Pair" },
  { value: "V3", label: "V3 - Trio" },
  { value: "V4", label: "V4 - Sum Matka" },
  { value: "V5", label: "V5 - Jackpot" },
];

export default function CreateGameModal({ open, onClose, onSuccess }) {
  const modalRef = useRef(null);
  const toast = useToast();

  const [name, setName] = useState("");
  const [variation, setVariation] = useState("V1");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleClose]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!name.trim()) {
      toast.error("Game name is required");
      return;
    }

    setLoading(true);
    try {
      await gamesApi.createGame({
        name,
        variation,
        description,
        is_active: isActive,
      });
      toast.success("Game created successfully!");
      setName("");
      setVariation("V1");
      setDescription("");
      setIsActive(true);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to create game");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/35 px-3 py-4 backdrop-blur-[6px]">
      <section
        ref={modalRef}
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-[600px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-950">Add Customized Game</h2>
              <p className="mt-1 text-sm text-slate-600">Configure new dynamic game templates.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="overflow-y-auto px-6 py-6 space-y-6">
          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
              Game Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Speed Single Card"
              className="h-12 w-full rounded border border-slate-300 bg-white px-4 text-base font-medium text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
              Game Variation
            </label>
            <select
              value={variation}
              onChange={(e) => setVariation(e.target.value)}
              className="h-12 w-full rounded border border-slate-300 bg-white px-4 text-base font-medium text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
            >
              {variations.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a description of rules or payout multiplier details..."
              rows={3}
              className="w-full rounded border border-slate-300 bg-white p-4 text-base font-medium text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/15"
            />
            <label htmlFor="isActive" className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              Active Template
            </label>
          </div>
        </form>

        <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="h-12 rounded border border-slate-300 bg-white px-6 text-base font-bold text-slate-800 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !name.trim()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded bg-blue-700 px-6 text-base font-extrabold text-white shadow-md hover:bg-blue-800 disabled:opacity-50"
          >
            <Plus className="h-5 w-5" />
            {loading ? "Creating..." : "Create Game"}
          </button>
        </footer>
      </section>
    </div>
  );
}
