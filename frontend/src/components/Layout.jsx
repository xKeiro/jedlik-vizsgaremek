import React from "react";
import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Categories from "./Categories";
import Category from "./Category";
import PriceList from "./PriceList";
import Product from "./Product";
import Contact from "./Contact";
import Cart from "./Cart";
import UserLogin from "./User/UserLogin";
import UserLogout from "./User/UserLogout";
import UserRegistration from "./User/UserRegistration";
import UserAccount from "./User/UserAccount";
import UserOrders from "./User/UserOrders";
import UserOrder from "./User/UserOrder";
import Admin from "./Admin/Admin";
import AdminHome from "./Admin/AdminHome";
import AdminOrders from "./Admin/AdminOrders";
import AdminOrder from "./Admin/AdminOrder";
import AdminProducts from "./Admin/AdminProducts";
import AdminProduct from "./Admin/AdminProduct";
import AdminCategories from "./Admin/AdminCategories";
import AdminCategory from "./Admin/AdminCategory";
import AdminSuppliers from "./Admin/AdminSuppliers";
import AdminSupplier from "./Admin/AdminSupplier";
import AdminShippers from "./Admin/AdminShippers";
import AdminShipper from "./Admin/AdminShipper";
import AdminReviews from "./Admin/AdminReviews";
import AdminReview from "./Admin/AdminReview";
import AdminUsers from "./Admin/AdminUsers";
import AdminUser from "./Admin/AdminUser";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AlertMessage from "./Shared/AlertMessage";

export default function Layout() {
  const auth = useContext(AuthContext);

  const [healthy, setHealthy] = useState(true);
  const [errorText, setErrorText] = useState("");

  async function healthCheck() {
    try {
      const response = await fetch(
        process.env.REACT_APP_API + "/api/HealthChecker",
        {
          method: "GET",
          mode: "cors",
        }
      );
      const responseText = await response.text();
      if (!response.ok) {
        console.log("Health:", responseText);
        setErrorText(
          "The webshop service is currently unavailable, please try again later."
        );
        setHealthy(false);
      }
      setErrorText("");
      setHealthy(true);
      return true;
    } catch (error) {
      console.log(error);
      setErrorText(
        "Unable to connect to the webshop service, please try again later."
      );
      setHealthy(false);
    }
  }

  useEffect(() => {
    document.title = "ITwebshop";
    healthCheck();
  }, []);

  return (
    <Container>
      <Header />
      {healthy ? (
        <>
          <Navbar />
          <Paper elevation={1}>
            <Box className="Content" sx={{ minHeight: "60vh" }}>
              <Routes>
                <Route index element={<Home />} />
                <Route path="pricelist" element={<PriceList />} />
                <Route path="product/:id" element={<Product />} />
                <Route path="categories" element={<Categories />} />
                <Route path="category/:id" element={<Category />} />
                <Route path="contact" element={<Contact />} />
                <Route path="registration" element={<UserRegistration />} />
                <Route path="cart" element={<Cart />} />
                <Route path="logout" element={<UserLogout />} />
                <Route path="login" element={<UserLogin />} />

                {auth.loggedIn && (
                  <>
                    <Route path="account" element={<UserAccount />} />
                    <Route path="orders" element={<UserOrders />} />
                    <Route path="order/:id" element={<UserOrder />} />
                  </>
                )}
                {auth.loggedIn && auth.user.isAdmin && (
                  <Route path="admin" element={<Admin />}>
                    <Route index element={<AdminHome />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="order/:id" element={<AdminOrder />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="product/:id" element={<AdminProduct />} />
                    <Route path="product" element={<AdminProduct />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route path="category/:id" element={<AdminCategory />} />
                    <Route path="category" element={<AdminCategory />} />
                    <Route path="suppliers" element={<AdminSuppliers />} />
                    <Route path="supplier/:id" element={<AdminSupplier />} />
                    <Route path="supplier" element={<AdminSupplier />} />
                    <Route path="shippers" element={<AdminShippers />} />
                    <Route path="shipper/:id" element={<AdminShipper />} />
                    <Route path="shipper" element={<AdminShipper />} />
                    <Route path="reviews" element={<AdminReviews />} />
                    <Route path="review/:id" element={<AdminReview />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="user/:id" element={<AdminUser />} />
                    <Route path="*" element={<AdminHome />} />
                  </Route>
                )}
                <Route path="*" element={<Home />} />
              </Routes>
            </Box>
          </Paper>
        </>
      ) : (
        <>
          <AlertMessage type="error" message={errorText} />
        </>
      )}
      <Footer />
    </Container>
  );
}
