import axiosInstance from "@/api/axiosInstance";
import API_ROUTES from "@/api/apiRoutes";

const dashboardApi = {
  getAdminDashboard() {
    return axiosInstance.get(API_ROUTES.ADMIN.DASHBOARD);
  },
};

export default dashboardApi;
