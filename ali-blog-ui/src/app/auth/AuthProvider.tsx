import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../models/user";
import { authStorage } from "./authStorage";
import { AuthContext } from "./authContextValue";


import type  { AuthContextValue } from "./authType";
type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(() => authStorage.getUser());

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: (loggedInUser) => {
        authStorage.setUser(loggedInUser);
        setUser(loggedInUser);
      },
      logout: () => {
        authStorage.removeUser();
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}