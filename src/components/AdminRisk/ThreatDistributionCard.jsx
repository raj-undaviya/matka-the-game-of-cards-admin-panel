export default function ThreatDistributionCard({ data = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-6">
          Threat Distribution
        </h3>

        <div className="space-y-5">
          {data.map((threat) => (
            <div key={threat.name} className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-600">{threat.name}</span>
                <span className="text-slate-900">{threat.value}%</span>
              </div>
              
              {/* Outer progress bar container */}
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                {/* Inner progress bar */}
                <div
                  className={`h-full rounded-full transition-all duration-500 ${threat.color}`}
                  style={{ width: `${threat.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
