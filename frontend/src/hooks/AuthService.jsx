import { useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie";

import AuthContext from "../contexts/AuthContext";

let refreshTimer;

const AuthService = (props) => {
  const [token, setToken] = useState(null);
  const [tokenExpDate, setTokenExpDate] = useState(null);
  const [user, setUser] = useState({
    id: "",
    name: "",
    photo: "",
    is_admin: false,
  });

  function updateUser(key, value) {
    setUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  function resetUser() {
    setUser({
      id: "",
      name: "",
      photo: "",
      is_admin: false,
    });
  }

  async function getUserDetails() {
    try {
      const response = await fetch("http://localhost:8000/api/users/me", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.detail[0].msg;
        console.log(errorMessage);
        return;
      }
      return responseBody;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  const login = useCallback(async (accessToken) => {
    if (!accessToken) {
      return;
    }

    setToken(accessToken);

    const decodedToken = jwtDecode(accessToken);
    updateUser("id", decodedToken.payload.sub);
    setTokenExpDate(decodedToken.payload.exp);

    const userDetails = await getUserDetails();
    if (userDetails) {
      updateUser("name", userDetails.username);
      updateUser("photo", userDetails.photo);
      updateUser("is_admin", userDetails.is_admin);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpDate(null);
    resetUser();
    Cookies.remove("logged_in");
  }, []);

  const refresh = useCallback(async () => {
    const newToken = await refreshToken();
    if (newToken) {
      login(newToken);
    } else {
      logout();
    }
  }, [login, logout]);

  async function refreshToken() {
    try {
      const response = await fetch("http://localhost:8000/api/auth/refresh", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.detail[0].msg;
        console.log(errorMessage);
        return;
      }
      return responseBody.access_token;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  function jwtDecode(jwtString) {
    let token = {};
    token.raw = jwtString;
    token.header = JSON.parse(window.atob(jwtString.split(".")[0]));
    token.payload = JSON.parse(window.atob(jwtString.split(".")[1]));
    return token;
  }

  useEffect(() => {
    if (token && tokenExpDate) {
      const fixedExpDate = tokenExpDate * 1000;
      const offset = 10000;
      const remainingTime = fixedExpDate - new Date().getTime() - offset;
      refreshTimer = setTimeout(refresh, remainingTime);
    } else {
      clearTimeout(refreshTimer);
    }
  }, [token, refresh, tokenExpDate]);

  return (
    <AuthContext.Provider
      value={{
        token: token,
        user: user,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthService;
