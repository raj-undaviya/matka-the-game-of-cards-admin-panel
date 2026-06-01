import axiosInstance from "@/api/axiosInstance";

const authApi = {
  login(payload) {
    return axiosInstance.post("/auth/login/", payload);
  },
};

export default authApi;
