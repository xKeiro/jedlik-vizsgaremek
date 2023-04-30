import "./App.css";
import React, { useEffect } from "react";
import Layout from "./components/Layout";
import AuthProvider from "./hooks/AuthService";
import CartProvider from "./hooks/CartService";
import Cookies from "js-cookie";
import { ColorModeContext } from "./contexts/ColorModeContext";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
//import customTheme from "./theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, blue } from "@mui/material/colors/";

function App() {
  const colorModeCookie = "color_mode";
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const colorModeCookieFound = Cookies.get(colorModeCookie);
  let foundColorMode = "";
  if (colorModeCookieFound) {
    foundColorMode = Cookies.get(colorModeCookie);
  } else {
    foundColorMode = prefersDarkMode ? "dark" : "light";
  }
  Cookies.set(colorModeCookie, foundColorMode, { expires: 7 });

  const [mode, setMode] = React.useState(foundColorMode);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  useEffect(() => {
    Cookies.set(colorModeCookie, mode, { expires: 7 });
  }, [mode]);

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: blue,
            divider: blue[700],
            background: {
              default: grey[300],
              paper: grey[50],
            },
          }
        : {
            // palette values for dark mode
            primary: blue,
            divider: blue[700],
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
