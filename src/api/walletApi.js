import axiosInstance from "@/api/axiosInstance";
import API_ROUTES from "@/api/apiRoutes";

const walletApi = {
  getDashboard() {
    return axiosInstance.get(API_ROUTES.ADMIN.DASHBOARD);
  },
  getWithdraws() {
    return axiosInstance.get(API_ROUTES.WALLET.WITHDRAWS);
  },
  withdrawAction(withdrawId, { action, reason }) {
    return axiosInstance.post(`${API_ROUTES.WALLET.WITHDRAWS}${withdrawId}/action/`, {
      action,
      reason,
    });
  },
  markPaid(withdrawId) {
    return axiosInstance.post(`${API_ROUTES.WALLET.WITHDRAWS}${withdrawId}/mark-paid/`);
  },
  getTransactions(params = {}) {
    return axiosInstance.get(API_ROUTES.ADMIN.TRANSACTIONS, { params });
  },
};

export default walletApi;
