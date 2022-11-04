import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";
import { useAuth } from "./hooks/AuthHook";
import Header from "./components/Header";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

function App() {
  useEffect(() => {
    document.title = "ITwebshop";
  }, []);

  const { token, login, logout, userId, username } = useAuth();

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          username: username,
          login: login,
          logout: logout,
        }}
      ></AuthContext.Provider>
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

              {/* {token && (
              <>
                <Route
                  path={`/user/${userId}/profile`}
                  element={<ProfilePage />}
                />
                <Route path={`/user/${userId}/orders`} element={<Orders />} />
                <Route
                  path={`/user/${userId}/orders/new`}
                  element={<NewOrder />}
                />
              </>
            )} */}

              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </Box>
        </Paper>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
