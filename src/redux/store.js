import { configureStore } from "@reduxjs/toolkit";
import authReducer, { logout } from "@/redux/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

if (typeof window !== "undefined") {
  window.addEventListener("auth:unauthorized", () => {
    store.dispatch(logout());
  });
}

export default store;
