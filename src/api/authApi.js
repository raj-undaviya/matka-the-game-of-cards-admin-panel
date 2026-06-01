import axiosInstance from "@/api/axiosInstance";
import API_ROUTES from "@/api/apiRoutes";

const authApi = {
  login(payload) {
    return axiosInstance.post(API_ROUTES.AUTH.LOGIN, payload);
  },
};

export default authApi;
