import axiosInstance from "@/api/axiosInstance";
import API_ROUTES from "@/api/apiRoutes";

const roundsApi = {
  getRounds(params = {}) {
    return axiosInstance.get(API_ROUTES.ADMIN.ROUNDS, { params });
  },
  getRoundDetail(roundId) {
    return axiosInstance.get(`${API_ROUTES.ADMIN.ROUNDS}${roundId}/`);
  },
  forceDraw(roundId) {
    return axiosInstance.post(`${API_ROUTES.ADMIN.ROUNDS}${roundId}/force-draw/`);
  },
};

export default roundsApi;
