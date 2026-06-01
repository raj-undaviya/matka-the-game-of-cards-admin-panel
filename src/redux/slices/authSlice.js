import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "@/api/authApi";
import { authStorage, extractAuthData } from "@/services/authService";

const storedAuth = authStorage.getAuth();

const initialState = {
  user: storedAuth?.user || null,
  token: storedAuth?.token || null,
  refreshToken: storedAuth?.refreshToken || null,
  isAuthenticated: Boolean(storedAuth?.token),
  rememberAuth: authStorage.shouldRememberAuth(),
  loading: false,
  loginLoading: false,
  success: false,
  error: null,
};

const getRejectValue = (error, fallbackMessage) => ({
  message: error?.message || fallbackMessage,
  status: error?.status,
  data: error?.data,
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, rememberAuth = false }, { rejectWithValue }) => {
    try {
      const response = await authApi.login({ email, password });
      const authData = extractAuthData(response.data, email);

      if (!authData.token) {
        return rejectWithValue({
          message: "Login response did not include an authentication token.",
          data: response.data,
        });
      }

      return { authData, rememberAuth };
    } catch (error) {
      return rejectWithValue(getRejectValue(error, "Login failed"));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.rememberAuth = false;
      state.success = false;
      state.error = null;
      authStorage.clearAuth();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { authData, rememberAuth } = action.payload;

        state.loginLoading = false;
        state.loading = false;
        state.success = true;
        state.rememberAuth = rememberAuth;
        state.user = authData.user;
        state.token = authData.token;
        state.refreshToken = authData.refreshToken;
        state.isAuthenticated = true;

        authStorage.setAuth(authData, rememberAuth);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Login failed";
      });
  },
});

export const { clearAuthError, logout } = authSlice.actions;
export default authSlice.reducer;
