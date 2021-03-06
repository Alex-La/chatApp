import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  userId: null,
  loginStr: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  endpoint: "http://localhost:5000"
});
