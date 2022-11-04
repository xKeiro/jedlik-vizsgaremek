import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [username, setUsername] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback(
    (loginId, loginName, loginToken, loginExpirationDate) => {
      setToken(loginToken);
      setUsername(loginName);
      setUserId(loginId);

      const tokenExpirationDate =
        loginExpirationDate || new Date(new Date().getTime() + 1000 * 60 * 10);
      console.log(loginToken);
      setTokenExpirationDate(tokenExpirationDate);

      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: loginId,
          username: loginName,
          token: loginToken,
          expiration:
            new Date(tokenExpirationDate.toISOString()) + 2 * 1000 * 60 * 60,
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setUsername(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();

      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.username,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, username };
};
