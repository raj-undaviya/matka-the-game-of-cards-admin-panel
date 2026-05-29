import { useMemo, useState } from "react";
import { ArrowRight, Loader2, SlidersHorizontal } from "lucide-react";
import Modal from "@/components/ui/Modal";
import {
  CheckboxField,
  CustomDropdown,
  Field,
  TextArea,
  TextInput,
  ToggleSwitch,
} from "@/components/ui/FormControls";

const initialForm = {
  name: "",
  description: "",
  targetAmount: "",
  seedAmount: "",
  contributionRate: "",
  schedule: "target",
  startDate: "",
  endDate: "",
  currency: "USD",
  status: true,
  winners: "1",
  notifications: true,
  retryLimit: "3",
  cooldownPeriod: "24",
  riskLevel: "medium",
  internalNotes: "",
};

const scheduleOptions = [
  { value: "target", label: "On Target Reach" },
  { value: "daily", label: "Daily Draw" },
  { value: "weekly", label: "Weekly Draw" },
  { value: "monthly", label: "Monthly Draw" },
];

const currencyOptions = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "INR", label: "INR - Indian Rupee" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
];

const riskLevelOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

function parsePositiveNumber(value) {
  const normalized = String(value).replaceAll(",", "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

export default function CreatePrizePoolModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(true);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const nextErrors = { ...current };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const validateForm = () => {
    const nextErrors = {};
    const targetAmount = parsePositiveNumber(form.targetAmount);
    const seedAmount = parsePositiveNumber(form.seedAmount);
    const contributionRate = parsePositiveNumber(form.contributionRate);
    const winners = Number(form.winners);
    const retryLimit = Number(form.retryLimit);
    const cooldownPeriod = Number(form.cooldownPeriod);

    if (!form.name.trim()) nextErrors.name = "Prize pool name is required.";
    if (!Number.isFinite(targetAmount) || targetAmount <= 0) {
      nextErrors.targetAmount = "Enter a target amount greater than 0.";
    }
    if (!Number.isFinite(seedAmount) || seedAmount < 0) {
      nextErrors.seedAmount = "Seed amount must be 0 or higher.";
    }
    if (Number.isFinite(targetAmount) && Number.isFinite(seedAmount) && seedAmount > targetAmount) {
      nextErrors.seedAmount = "Seed amount cannot exceed target amount.";
    }
    if (!Number.isFinite(contributionRate) || contributionRate <= 0 || contributionRate > 100) {
      nextErrors.contributionRate = "Use a rate between 0.01 and 100.";
    }
    if (!form.startDate) nextErrors.startDate = "Start date is required.";
    if (!form.endDate) nextErrors.endDate = "End date is required.";
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      nextErrors.endDate = "End date must be after the start date.";
    }
    if (!Number.isInteger(winners) || winners < 1) {
      nextErrors.winners = "Enter at least 1 winner.";
    }
    if (!Number.isInteger(retryLimit) || retryLimit < 0 || retryLimit > 20) {
      nextErrors.retryLimit = "Retry limit must be between 0 and 20.";
    }
    if (!Number.isFinite(cooldownPeriod) || cooldownPeriod < 0) {
      nextErrors.cooldownPeriod = "Cooldown period cannot be negative.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      onCreate?.(form);
      setForm(initialForm);
      onClose?.();
    }, 700);
  };

  const footer = (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onClose}
        className="inline-flex h-11 items-center justify-center rounded border border-slate-300 bg-white px-6 text-sm font-bold text-slate-800 transition-default hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400/30"
      >
        Cancel
      </button>
      <button
        type="submit"
        form="create-prize-pool-form"
        disabled={submitting}
        className="inline-flex h-11 items-center justify-center gap-2 rounded bg-emerald-700 px-6 text-sm font-extrabold text-white shadow-md transition-default hover:bg-emerald-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/35 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Pool"}
        {!submitting && <ArrowRight className="h-4 w-4" />}
      </button>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Prize Pool"
      description="Configure the parameters for a new system-wide jackpot pool."
      labelledBy="create-prize-pool-title"
      describedBy="create-prize-pool-description"
      maxWidth="max-w-4xl"
      footer={footer}
    >
      <form id="create-prize-pool-form" className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Field label="Prize Pool Name" error={errors.name}>
              <TextInput
                value={form.name}
                error={errors.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="e.g. Summer Special Mega Jackpot"
                autoComplete="off"
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Description">
              <TextArea
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
                placeholder="Short operational summary for admins"
              />
            </Field>
          </div>

          <Field label="Target Amount" error={errors.targetAmount}>
            <TextInput
              value={form.targetAmount}
              error={errors.targetAmount}
              inputMode="decimal"
              onChange={(event) => updateField("targetAmount", event.target.value)}
              placeholder="1,000,000"
            />
          </Field>

          <Field label="Seed Amount" error={errors.seedAmount}>
            <TextInput
              value={form.seedAmount}
              error={errors.seedAmount}
              inputMode="decimal"
              onChange={(event) => updateField("seedAmount", event.target.value)}
              placeholder="50,000"
            />
          </Field>

          <Field label="Contribution Rate %" error={errors.contributionRate}>
            <TextInput
              value={form.contributionRate}
              error={errors.contributionRate}
              inputMode="decimal"
              onChange={(event) => updateField("contributionRate", event.target.value)}
              placeholder="2.5"
            />
          </Field>

          <Field label="Auto Trigger Schedule">
            <CustomDropdown
              value={form.schedule}
              options={scheduleOptions}
              onChange={(value) => updateField("schedule", value)}
              ariaLabel="Auto Trigger Schedule"
            />
          </Field>

          <Field label="Start Date" error={errors.startDate}>
            <TextInput
              type="date"
              min={today}
              value={form.startDate}
              error={errors.startDate}
              onChange={(event) => updateField("startDate", event.target.value)}
            />
          </Field>

          <Field label="End Date" error={errors.endDate}>
            <TextInput
              type="date"
              min={form.startDate || today}
              value={form.endDate}
              error={errors.endDate}
              onChange={(event) => updateField("endDate", event.target.value)}
            />
          </Field>

          <Field label="Currency">
            <CustomDropdown
              value={form.currency}
              options={currencyOptions}
              onChange={(value) => updateField("currency", value)}
              ariaLabel="Currency"
            />
          </Field>

          <Field label="Number of Winners" error={errors.winners}>
            <TextInput
              type="number"
              min="1"
              step="1"
              value={form.winners}
              error={errors.winners}
              onChange={(event) => updateField("winners", event.target.value)}
            />
          </Field>

          <Field label="Status">
            <ToggleSwitch
              checked={form.status}
              onChange={(value) => updateField("status", value)}
              label={form.status ? "Active" : "Paused"}
            />
          </Field>

          <Field label="Notifications">
            <CheckboxField
              checked={form.notifications}
              onChange={(value) => updateField("notifications", value)}
              label="Enable Notifications"
            />
          </Field>
        </div>

        <section className="rounded-lg border border-slate-200 bg-slate-50/70">
          <button
            type="button"
            onClick={() => setAdvancedOpen((current) => !current)}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-default hover:bg-slate-100/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            aria-expanded={advancedOpen}
          >
            <span className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700">
              <SlidersHorizontal className="h-4 w-4" />
              Advanced Options
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {advancedOpen ? "Hide" : "Show"}
            </span>
          </button>

          {advancedOpen && (
            <div className="grid grid-cols-1 gap-4 border-t border-slate-200 p-4 md:grid-cols-2">
              <Field label="Retry Limit" error={errors.retryLimit}>
                <TextInput
                  type="number"
                  min="0"
                  max="20"
                  step="1"
                  value={form.retryLimit}
                  error={errors.retryLimit}
                  onChange={(event) => updateField("retryLimit", event.target.value)}
                />
              </Field>

              <Field label="Cooldown Period" error={errors.cooldownPeriod}>
                <TextInput
                  type="number"
                  min="0"
                  value={form.cooldownPeriod}
                  error={errors.cooldownPeriod}
                  onChange={(event) => updateField("cooldownPeriod", event.target.value)}
                  placeholder="Hours"
                />
              </Field>

              <Field label="Risk Level">
                <CustomDropdown
                  value={form.riskLevel}
                  options={riskLevelOptions}
                  onChange={(value) => updateField("riskLevel", value)}
                  ariaLabel="Risk Level"
                />
              </Field>

              <div className="md:col-span-2">
                <Field label="Internal Notes">
                  <TextArea
                    value={form.internalNotes}
                    onChange={(event) => updateField("internalNotes", event.target.value)}
                    placeholder="Private notes visible to jackpot operations only"
                  />
                </Field>
              </div>
            </div>
          )}
        </section>
      </form>
    </Modal>
  );
}
