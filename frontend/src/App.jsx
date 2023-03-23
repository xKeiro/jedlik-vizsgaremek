import "./App.css";
import React from "react";
import { useEffect, useContext } from "react";
import Cookies from "js-cookie";

import AuthContext from "./contexts/AuthContext";
import AuthProvider from "./hooks/AuthService";
import CartProvider from "./hooks/CartService";
import { ColorModeContext } from "./contexts/ColorModeContext";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import grey from "@mui/material/colors/grey";
import deepOrange from "@mui/material/colors/deepOrange";

//import customTheme from "./theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Layout from "./components/Layout";

function App() {
  const auth = useContext(AuthContext);
  useEffect(() => {
    document.title = "ITwebshop";

    const alreadyLoggedIn = Cookies.get("logged_in");
    if (alreadyLoggedIn) {
      auth.refresh();
    }
  }, [auth]);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState(prefersDarkMode ? "dark" : "light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: deepOrange,
            divider: deepOrange[700],
            background: {
              default: grey[300],
              paper: grey[50],
            },
          }
        : {
            // palette values for dark mode
            primary: deepOrange,
            divider: deepOrange[700],
          }),
    },
  });

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <AuthProvider>
            <CartProvider>
              <Layout />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
