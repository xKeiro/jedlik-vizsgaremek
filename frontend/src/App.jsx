import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import { AuthContext } from "./contexts/AuthContext";
import { useAuth } from "./hooks/AuthHook";
import { ColorModeContext } from "./contexts/ColorModeContext";
import Header from "./components/Header";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

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
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

function App() {
  const { token, user, login, logout, refresh } = useAuth();

  useEffect(() => {
    document.title = "ITwebshop";

    const alreadyLoggedIn = Cookies.get("logged_in");
    if (alreadyLoggedIn) {
      refresh();
    }
  }, [refresh]);

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
          <CssBaseline />
          <AuthContext.Provider
            value={{
              token: token,
              user: user,
              login: login,
              logout: logout,
            }}
          >
            <Container>
              <Header />
              <Navbar />
              <Paper>
                <Box className="Content" sx={{ minHeight: "60vh" }}>
                  <Routes>
                    <Route path="products" element={<Products />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="registration" element={<Registration />} />
                    {!token && <Route path="/login" element={<Login />} />}

                    {token && (
                      <>
                        {/* <Route path={`/account`} element={<Account />} />
                        <Route path={`/orders`} element={<Orders />} /> */}
                        <Route path={`/logout`} element={<Logout />} />
                      </>
                    )}

                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                  </Routes>
                </Box>
              </Paper>
              <Footer />
            </Container>
          </AuthContext.Provider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
