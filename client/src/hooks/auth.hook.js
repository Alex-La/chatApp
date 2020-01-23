import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loginStr, setLoginStr] = useState(null);

  const login = useCallback((jwtToken, id, logStr) => {
    setToken(jwtToken);
    setUserId(id);
    setLoginStr(logStr);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
        login: logStr
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setLoginStr(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId, data.login);
    }

    setReady(true);
  }, [login]);

  return { login, logout, token, userId, loginStr, ready };
};
