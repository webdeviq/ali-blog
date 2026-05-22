import { createContext } from "react";

import type { AlertColor } from "@mui/material";

export type NotificationContextValue = {
  showNotification: (message: string, severity?: AlertColor) => void;
};

export const NotificationContext = createContext<
  NotificationContextValue | undefined
>(undefined);
