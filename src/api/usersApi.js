import axiosInstance from "@/api/axiosInstance";
import API_ROUTES from "@/api/apiRoutes";

const usersApi = {
  getUsers(params = {}) {
    return axiosInstance.get(API_ROUTES.ADMIN.USERS, { params });
  },
  getUserDetail(userId) {
    return axiosInstance.get(`${API_ROUTES.ADMIN.USERS}${userId}/`);
  },
  adjustWallet(userId, { action, amount, note }) {
    return axiosInstance.post(`${API_ROUTES.ADMIN.USERS}${userId}/adjust-wallet/`, {
      action,
      amount,
      note,
    });
  },
};

export default usersApi;
