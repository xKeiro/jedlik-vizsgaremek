import React from "react";

export default React.createContext({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
  refresh: () => {},
});
