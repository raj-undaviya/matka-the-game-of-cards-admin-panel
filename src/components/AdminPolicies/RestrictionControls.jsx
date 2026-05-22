import { useState } from "react";
import SectionCard from "@/components/shared/SectionCard";
import ControlToggle from "@/components/shared/ControlToggle";
import { restrictionControls as initialControls } from "@/data/policiesData";

export default function RestrictionControls() {
  const [controls, setControls] = useState(initialControls);

  const handleToggle = (id) => {
    setControls((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
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
