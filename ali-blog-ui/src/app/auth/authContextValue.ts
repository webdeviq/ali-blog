import { createContext } from "react";


import type { AuthContextValue } from "./authType";


export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);