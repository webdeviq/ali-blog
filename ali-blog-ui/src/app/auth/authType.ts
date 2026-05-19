import type { User } from "../models/user";

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};


export type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
};

