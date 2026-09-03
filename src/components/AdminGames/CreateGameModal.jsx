import { useState, useRef, useEffect, useCallback } from "react";
import { X, Trophy, Plus } from "lucide-react";
import gamesApi from "@/api/gamesApi";
import useToast from "@/utils/useToast";

const PRESET_BADGES = [
  { label: "Single Card Badge (medal_single.png)", value: "medal_single.png" },
  { label: "Pair Selection Badge (medal_pair.png)", value: "medal_pair.png" },
  { label: "Trio Game Badge (medal_trio.png)", value: "medal_trio.png" },
  { label: "Last Digit Sum Badge (medal_sum.png)", value: "medal_sum.png" },
  { label: "Lucky Draw Jackpot Badge (medal_jackpot.png)", value: "medal_jackpot.png" },
  { label: "Custom URL", value: "custom" },
];

export default function CreateGameModal({ open, onClose, onSuccess }) {
  const modalRef = useRef(null);
  const toast = useToast();

  const [name, setName] = useState("");
  const [variation, setVariation] = useState("V1");
  const [description, setDescription] = useState("");
  const [selectedBadgePreset, setSelectedBadgePreset] = useState("medal_single.png");
  const [imageUrl, setImageUrl] = useState("medal_single.png");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleClose]);

  const handlePresetChange = (presetValue) => {
    setSelectedBadgePreset(presetValue);
    if (presetValue !== "custom") {
      setImageUrl(presetValue);
    } else {
      setImageUrl("");
    }
  };

  const handleVariationChange = (val) => {
    setVariation(val);
    if (val === "V1") {
      setName("SINGLE CARD GAME");
      setSelectedBadgePreset("medal_single.png");
      setImageUrl("medal_single.png");
    } else if (val === "V2") {
      setName("PAIR SELECTION");
      setSelectedBadgePreset("medal_pair.png");
      setImageUrl("medal_pair.png");
    } else if (val === "V3") {
      setName("TRIO GAME TION AU");
      setSelectedBadgePreset("medal_trio.png");
      setImageUrl("medal_trio.png");
    } else if (val === "V4") {
      setName("LAST DIGIT SUM");
      setSelectedBadgePreset("medal_sum.png");
      setImageUrl("medal_sum.png");
    } else if (val === "V5") {
      setName("LUCKLY DRAW JACCPOT");
      setSelectedBadgePreset("medal_jackpot.png");
      setImageUrl("medal_jackpot.png");
    }
  };

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
        image_url: imageUrl,
        is_active: isActive,
      });
      toast.success("Game Template saved successfully!");
      setName("");
      setDescription("");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to create game template");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/35 px-3 py-4 backdrop-blur-[6px]">
      <section
        ref={modalRef}
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-[650px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-950">Add Game Template</h2>
              <p className="mt-1 text-sm text-slate-600">Configure game mode, graphics, and description for HomeScreen.</p>
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

        <form onSubmit={handleSubmit} className="overflow-y-auto px-6 py-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
                Variation
              </label>
              <select
                value={variation}
                onChange={(e) => handleVariationChange(e.target.value)}
                className="h-12 w-full rounded border border-slate-300 bg-white px-4 text-base font-medium text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
              >
                <option value="V1">V1 - Single Card Game</option>
                <option value="V2">V2 - Pair Selection</option>
                <option value="V3">V3 - Trio Game</option>
                <option value="V4">V4 - Last Digit Sum</option>
                <option value="V5">V5 - Jackpot Draw</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
                Game Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. SINGLE CARD GAME"
                className="h-12 w-full rounded border border-slate-300 bg-white px-4 text-base font-medium text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
              Description (Optional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Pick a lucky single card and multiply rewards by up to 30x."
              className="w-full rounded border border-slate-300 bg-white p-3 text-base font-medium text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-800">
              Image / Icon Asset
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={selectedBadgePreset}
                onChange={(e) => handlePresetChange(e.target.value)}
                className="h-12 w-full rounded border border-slate-300 bg-white px-4 text-base font-medium text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
              >
                {PRESET_BADGES.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="medal_single.png or https://..."
                className="h-12 w-full rounded border border-slate-300 bg-white px-4 text-base font-medium text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/15"
            />
            <label htmlFor="isActive" className="text-sm font-bold text-slate-800">
              Active on Mobile App HomeScreen
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
            className="inline-flex h-12 items-center justify-center gap-2 rounded bg-blue-600 px-6 text-base font-extrabold text-white shadow-md hover:bg-blue-700 disabled:opacity-50"
          >
            <Plus className="h-5 w-5" />
            {loading ? "Saving..." : "Save Game"}
          </button>
        </footer>
      </section>
    </div>
  );
}
