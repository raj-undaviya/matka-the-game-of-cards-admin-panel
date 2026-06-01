const AUTH_STORAGE_KEY = "matka_admin_auth";
const REMEMBER_AUTH_KEY = "matka_remember_auth";

const safeJsonParse = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

export const authStorage = {
  getAuth() {
    return (
      safeJsonParse(sessionStorage.getItem(AUTH_STORAGE_KEY)) ||
      safeJsonParse(localStorage.getItem(AUTH_STORAGE_KEY))
    );
  },

  setAuth(authData, remember = false) {
    const storage = remember ? localStorage : sessionStorage;
    const otherStorage = remember ? sessionStorage : localStorage;

    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    localStorage.setItem(REMEMBER_AUTH_KEY, JSON.stringify(remember));
    otherStorage.removeItem(AUTH_STORAGE_KEY);
  },

  clearAuth() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(REMEMBER_AUTH_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  },

  getToken() {
    return this.getAuth()?.token || null;
  },

  shouldRememberAuth() {
    return safeJsonParse(localStorage.getItem(REMEMBER_AUTH_KEY)) === true;
  },
};

export const getApiErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
  const data = error?.response?.data;

  if (typeof data === "string") return data;
  if (data?.message) return data.message;
  if (data?.detail) return data.detail;
  if (data?.error) return data.error;
  if (Array.isArray(data?.non_field_errors)) return data.non_field_errors[0];

  const firstFieldError = data && Object.values(data).find((value) => {
    if (typeof value === "string") return true;
    return Array.isArray(value) && value.length > 0;
  });

  if (Array.isArray(firstFieldError)) return firstFieldError[0];
  if (typeof firstFieldError === "string") return firstFieldError;

  return error?.message || fallback;
};

export const extractAuthData = (payload, fallbackEmail) => {
  const data = payload?.data || payload;
  const token =
    data?.access ||
    data?.access_token ||
    data?.token ||
    data?.auth_token ||
    data?.tokens?.access ||
    data?.data?.access ||
    data?.data?.access_token ||
    data?.data?.token ||
    null;

  const refreshToken =
    data?.refresh ||
    data?.refresh_token ||
    data?.tokens?.refresh ||
    data?.data?.refresh ||
    data?.data?.refresh_token ||
    null;

  const user =
    data?.user ||
    data?.admin ||
    data?.data?.user ||
    data?.data?.admin ||
    (fallbackEmail ? { email: fallbackEmail } : null);

  return {
    token,
    refreshToken,
    user,
    raw: data,
  };
};
