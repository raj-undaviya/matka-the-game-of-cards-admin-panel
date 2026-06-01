import { useCallback, useMemo, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { ToastContext } from "@/utils/toastContext";

const DEFAULT_DURATION = 3600;

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, severity = "success", options = {}) => {
    setToast({
      message,
      severity,
      duration: options.duration ?? DEFAULT_DURATION,
    });
  }, []);

  const toastApi = useMemo(
    () => ({
      showToast,
      success: (message, options) => showToast(message, "success", options),
      error: (message, options) => showToast(message, "error", options),
      info: (message, options) => showToast(message, "info", options),
      warning: (message, options) => showToast(message, "warning", options),
    }),
    [showToast]
  );

  const handleClose = (_event, reason) => {
    if (reason === "clickaway") return;
    setToast(null);
  };

  return (
    <ToastContext.Provider value={toastApi}>
      {children}
      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={toast?.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {toast ? (
          <Alert
            variant="filled"
            severity={toast.severity}
            onClose={handleClose}
            sx={(theme) => ({
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[4],
              fontWeight: 700,
            })}
          >
            {toast.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </ToastContext.Provider>
  );
}
