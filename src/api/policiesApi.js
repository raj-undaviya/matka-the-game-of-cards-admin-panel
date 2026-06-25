import axiosInstance from "@/api/axiosInstance";
import API_ROUTES from "@/api/apiRoutes";

const policiesApi = {
  getComplianceDashboard() {
    return axiosInstance.get(API_ROUTES.POLICIES.DASHBOARD);
  },
  exportReport() {
    return axiosInstance.get(API_ROUTES.POLICIES.EXPORT, { responseType: "blob" });
  },
  getDocuments() {
    return axiosInstance.get(API_ROUTES.POLICIES.DOCUMENTS);
  },
  createDocument(payload) {
    return axiosInstance.post(API_ROUTES.POLICIES.DOCUMENTS, payload);
  },
  updateDocument(docId, payload) {
    return axiosInstance.patch(`${API_ROUTES.POLICIES.DOCUMENTS}${docId}/`, payload);
  },
  deleteDocument(docId) {
    return axiosInstance.delete(`${API_ROUTES.POLICIES.DOCUMENTS}${docId}/`);
  },
  getVersions() {
    return axiosInstance.get(API_ROUTES.POLICIES.VERSIONS);
  },
  createVersion(payload) {
    return axiosInstance.post(API_ROUTES.POLICIES.VERSIONS, payload);
  },
  getJurisdictions() {
    return axiosInstance.get(API_ROUTES.POLICIES.JURISDICTIONS);
  },
  createJurisdiction(payload) {
    return axiosInstance.post(API_ROUTES.POLICIES.JURISDICTIONS, payload);
  },
  getRestrictions() {
    return axiosInstance.get(API_ROUTES.POLICIES.RESTRICTIONS);
  },
  updateRestriction(restId, payload) {
    return axiosInstance.patch(`${API_ROUTES.POLICIES.RESTRICTIONS}${restId}/`, payload);
  },
};

export default policiesApi;
