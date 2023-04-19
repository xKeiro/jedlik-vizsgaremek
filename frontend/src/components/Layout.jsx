import React from "react";
import { useEffect, useContext } from "react";
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
import UserCheckout from "./User/UserCheckout";
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
import AdminUsers from "./Admin/AdminUsers";
import AdminUser from "./Admin/AdminUser";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default function Layout() {
  const auth = useContext(AuthContext);

  useEffect(() => {
    document.title = "ITwebshop";
  }, []);

  return (
    <Container>
      <Header />
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
            {!auth.token && <Route path="login" element={<UserLogin />} />}

            {auth.token && (
              <>
                <Route path="account" element={<UserAccount />} />
                <Route path="orders" element={<UserOrders />} />
                <Route path="checkout" element={<UserCheckout />} />
                <Route path="logout" element={<UserLogout />} />
              </>
            )}
            {auth.token && auth.user.is_admin && (
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
                <Route path="users" element={<AdminUsers />} />
                <Route path="user/:id" element={<AdminUser />} />
                <Route path="*" element={<AdminHome />} />
              </Route>
            )}
            <Route path="*" element={<Home />} />
          </Routes>
        </Box>
      </Paper>
      <Footer />
    </Container>
  );
}
