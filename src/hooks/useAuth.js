import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthError,
  loginUser,
  logout,
} from "@/redux/slices/authSlice";

export default function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return {
    ...auth,
    clearError: () => dispatch(clearAuthError()),
    login: (credentials) => dispatch(loginUser(credentials)).unwrap(),
    logout: () => dispatch(logout()),
  };
}
