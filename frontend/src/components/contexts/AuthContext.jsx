import { createContext } from "react";

export const AuthContext = createContext({
  userId: null,
  username: null,
  token: null,
  login: () => {},
  logout: () => {},
});
