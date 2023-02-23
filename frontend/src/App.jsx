import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import { AuthContext } from "./contexts/AuthContext";
import { useAuth } from "./hooks/AuthHook";
import { ColorModeContext } from "./contexts/ColorModeContext";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Category from "./components/Category";
import PriceList from "./components/PriceList";
import Product from "./components/Product";
import Contact from "./components/Contact";
import UserLogin from "./components/User/UserLogin";
import UserLogout from "./components/User/UserLogout";
import UserRegistration from "./components/User/UserRegistration";
import UserAccount from "./components/User/UserAccount";
import UserOrders from "./components/User/UserOrders";
import Admin from "./components/Admin/Admin";
import AdminHome from "./components/Admin/AdminHome";
import AdminOrders from "./components/Admin/AdminOrders";
import AdminOrder from "./components/Admin/AdminOrder";
import AdminProducts from "./components/Admin/AdminProducts";
import AdminProduct from "./components/Admin/AdminProduct";
import AdminCategories from "./components/Admin/AdminCategories";
import AdminCategory from "./components/Admin/AdminCategory";

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
          <CssBaseline enableColorScheme />
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
                    <Route index element={<Home />} />
                    <Route path="pricelist" element={<PriceList />} />
                    <Route path="product/:id" element={<Product />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="category/:id" element={<Category />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="registration" element={<UserRegistration />} />
                    {!token && <Route path="login" element={<UserLogin />} />}

                    {token && (
                      <>
                        <Route path="account" element={<UserAccount />} />
                        <Route path="orders" element={<UserOrders />} />
                        <Route path="logout" element={<UserLogout />} />
                      </>
                    )}
                    {token && user.is_admin && (
                      <Route path="admin" element={<Admin />}>
                        <Route index element={<AdminHome />} />
                        <Route path="orders" element={<AdminOrders />} />
                        <Route path="order/:id" element={<AdminOrder />} />
                        <Route path="order" element={<AdminOrder />} />
                        <Route path="products" element={<AdminProducts />} />
                        <Route path="product/:id" element={<AdminProduct />} />
                        <Route path="product" element={<AdminProduct />} />
                        <Route
                          path="categories"
                          element={<AdminCategories />}
                        />
                        <Route
                          path="category/:id"
                          element={<AdminCategory />}
                        />
                        <Route path="category" element={<AdminCategory />} />
                        <Route path="*" element={<AdminHome />} />
                      </Route>
                    )}
                    <Route path="*" element={<Home />} />
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
