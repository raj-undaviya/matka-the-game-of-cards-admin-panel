import { useState, useEffect } from "react";
import SectionCard from "@/components/shared/SectionCard";
import ControlToggle from "@/components/shared/ControlToggle";
import { restrictionControls as initialMockControls } from "@/data/policiesData";

export default function RestrictionControls({ controls: externalControls, onToggle }) {
  const [controls, setControls] = useState(externalControls || initialMockControls);

  // Sync with external controls when they arrive from API
  useEffect(() => {
    if (externalControls) {
      setControls(externalControls);
    }
  }, [externalControls]);

  const handleToggle = (id) => {
    setControls((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
    if (onToggle) onToggle(id);
  };

  return (
    <SectionCard title="Restriction Controls" bodyClassName="pt-2">
      {controls.map((control) => (
        <ControlToggle
          key={control.id}
          label={control.label}
          description={control.description}
          checked={control.enabled}
          onChange={() => handleToggle(control.id)}
        />
      ))}
    </SectionCard>
  );
}
