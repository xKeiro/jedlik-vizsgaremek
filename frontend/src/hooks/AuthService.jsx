import { useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie";

import AuthContext from "../contexts/AuthContext";

const AuthService = (props) => {
  const loggedInCookie = "logged_in";
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    username: "",
    photo: "",
    isAdmin: false,
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
      username: "",
      photo: "",
      isAdmin: false,
    });
  }

  async function refreshUser() {
    try {
      const response = await fetch("http://localhost:5000/api/users/me", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.detail;
        console.log(errorMessage);
        return;
      }
      return responseBody;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  const login = useCallback(async (responseBody) => {
    if (!responseBody.id) {
      return false;
    }
    updateUser("id", responseBody.id);
    updateUser("username", responseBody.username);
    updateUser("photo", responseBody.photo);
    updateUser("isAdmin", responseBody.isAdmin);
    setLoggedIn(true);
    Cookies.set(loggedInCookie, true, { expires: 7 });
    console.log("User logged in.");
    return true;
  }, []);

  const logout = useCallback(() => {
    setLoggedIn(false);
    resetUser();
    Cookies.remove(loggedInCookie);
    console.log("User logged out.");
    return true;
  }, []);

  const refresh = useCallback(async () => {
    const responseBody = await refreshUser();
    if (responseBody.id) {
      login(responseBody);
    } else {
      logout();
    }
  }, [login, logout]);

  useEffect(() => {
    const loggedInCookieFound = Cookies.get(loggedInCookie);
    if (loggedInCookieFound) refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{
        loggedIn: loggedIn,
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
