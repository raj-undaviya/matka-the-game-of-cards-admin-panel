const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login/",
  },
  ADMIN: {
    DASHBOARD: "/game/admin/dashboard/",
    GAMES: "/game/admin/games/",
    GAMES_CREATE: "game/admin/games/create/",
    POOLS_CREATE: "game/admin/pools/create/",
    POOLS_START: (poolId) => `game/admin/pools/${poolId}/start/`,
    ROUNDS: "/game/admin/rounds/",
    USERS: "/game/admin/users/",
    TRANSACTIONS: "/game/admin/transactions/",
    DEPLOY_ARENA: "/admin/deploy-arena/",
    SERVERS: "/admin/servers/",
    SERVERS_HEALTH: "/admin/servers/health/",
  },
  POOLS: {
    LIST: "game/pools/",
    LEADERBOARD: (poolId) => `/pools/${poolId}/leaderboard/`,
  },
  WALLET: {
    WITHDRAWS: "/wallet/admin-panel/withdraws/",
  },
  POLICIES: {
    DASHBOARD: "/policies/dashboard/",
    EXPORT: "/policies/export/",
    DOCUMENTS: "/policies/documents/",
    VERSIONS: "/policies/versions/",
    JURISDICTIONS: "/policies/jurisdictions/",
    RESTRICTIONS: "/policies/restrictions/",
  },
};

export default API_ROUTES;
