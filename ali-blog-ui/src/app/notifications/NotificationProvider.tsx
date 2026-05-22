import { Alert, Snackbar, type AlertColor } from "@mui/material";
import { useState, type ReactNode } from "react";

import { NotificationContext } from "./NotificationContext";

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  function showNotification(message: string, severity: AlertColor = "success") {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}
