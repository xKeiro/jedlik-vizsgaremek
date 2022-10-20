import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "./components/contexts/AuthContext";
import { useAuth } from "./components/hooks/AuthHook";
import Header from "./components/Header";
import Home from "./components/Home";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Container from "@mui/material/Container";

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
        <div className="Content">
          <Routes>
            <Route path="products" element={<Products />} />
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
        </div>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
