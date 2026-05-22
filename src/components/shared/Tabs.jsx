export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex gap-1 overflow-x-auto hide-scrollbar border-b border-gray-100">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className="px-4 py-3 text-sm font-medium whitespace-nowrap transition-default relative"
            style={{
              color: isActive ? "var(--primary-color)" : "var(--text-light-color)",
            }}
          >
            {tab.label}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ backgroundColor: "var(--primary-color)" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
