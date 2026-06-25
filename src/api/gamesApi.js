import axiosInstance from "@/api/axiosInstance";
import API_ROUTES from "@/api/apiRoutes";

const gamesApi = {
  getGamesDashboard() {
    return axiosInstance.get(API_ROUTES.ADMIN.GAMES);
  },
  deployArena(payload) {
    return axiosInstance.post(API_ROUTES.ADMIN.DEPLOY_ARENA, payload);
  },
};

export default gamesApi;
