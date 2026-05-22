import { topGames } from "@/data/dashboarddata";

export default function TopGamesWidget() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-full">
      <h2 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>
        Top Performing Games
      </h2>
      <p className="text-sm mt-1" style={{ color: "var(--text-light-color)" }}>
        By active players this week
      </p>

      <ul className="mt-5 space-y-4">
        {topGames.map((game, index) => (
          <li
            key={game.name}
            className="flex items-center justify-between gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                style={{
                  backgroundColor: "var(--primary-light-color)",
                  color: "var(--primary-color)",
                }}
              >
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="font-semibold truncate" style={{ color: "var(--text-color)" }}>
                  {game.name}
                </p>
                <p className="text-xs" style={{ color: "var(--text-light-color)" }}>
                  {game.players.toLocaleString()} players
                </p>
              </div>
            </div>
            <span className="text-sm font-semibold shrink-0" style={{ color: "var(--primary-color)" }}>
              {game.revenue}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
