import React from "react";

export default React.createContext({
  loggedIn: null,
  user: null,
  login: () => {},
  logout: () => {},
  refresh: () => {},
});
