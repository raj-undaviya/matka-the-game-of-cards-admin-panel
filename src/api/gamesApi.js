import axiosInstance from "@/api/axiosInstance";
import API_ROUTES from "@/api/apiRoutes";

const gamesApi = {
  getGamesDashboard() {
    return axiosInstance.get(API_ROUTES.ADMIN.GAMES);
  },
  deployArena(payload) {
    return axiosInstance.post(API_ROUTES.ADMIN.DEPLOY_ARENA, payload);
  },
  createGame(payload) {
    return axiosInstance.post(API_ROUTES.ADMIN.GAMES_CREATE, payload);
  },
  getGamesList() {
    return axiosInstance.get(API_ROUTES.ADMIN.GAMES_CREATE);
  },
  createPool(payload) {
    return axiosInstance.post(API_ROUTES.ADMIN.POOLS_CREATE, payload);
  },
  startPool(poolId) {
    return axiosInstance.post(API_ROUTES.ADMIN.POOLS_START(poolId));
  },
  getPoolsList() {
    return axiosInstance.get(API_ROUTES.POOLS.LIST);
  },
  getPoolLeaderboard(poolId) {
    return axiosInstance.get(API_ROUTES.POOLS.LEADERBOARD(poolId));
  },
};

export default gamesApi;
