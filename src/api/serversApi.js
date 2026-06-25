import axiosInstance from "@/api/axiosInstance";
import API_ROUTES from "@/api/apiRoutes";

const serversApi = {
  getServers() {
    return axiosInstance.get(API_ROUTES.ADMIN.SERVERS);
  },
  getServersHealth() {
    return axiosInstance.get(API_ROUTES.ADMIN.SERVERS_HEALTH);
  },
  getServerStatus(serverId) {
    return axiosInstance.get(`${API_ROUTES.ADMIN.SERVERS}${serverId}/status/`);
  },
  serverAction(serverId, action) {
    return axiosInstance.post(`${API_ROUTES.ADMIN.SERVERS}${serverId}/action/`, { action });
  },
};

export default serversApi;
