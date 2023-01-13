import React from "react";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import { Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import AdminHome from "./AdminHome";
import AdminProducts from "./AdminProducts";
import AdminProduct from "./AdminProduct";

export default function Admin() {
  const [adminMenu, setAdminMenu] = useState([
    { name: "Home", route: "/admin/" },
    { name: "Products", route: "/admin/products" },
    { name: "Categories", route: "/admin/" },
    { name: "Suppliers", route: "/admin/" },
    { name: "Users", route: "/admin/" },
    { name: "Reviews", route: "/admin/" },
  ]);
  return (
    <div className="Admin">
      <div>
        <h2>Admin Panel</h2>
      </div>

      <Grid
        container
        direction="row"
        justifyContent="center"
        //alignItems="center"
        spacing={2}
      >
        <Grid item md={3} xs={12}>
          <div>
            <h3>Admin Pages</h3>
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
              <nav aria-label="admin pages">
                <Divider />
                <List>
                  {adminMenu.map((menuItem) => (
                    <ListItem key={menuItem.name} disablePadding>
                      <ListItemButton
                        component={RouterLink}
                        to={menuItem.route}
                      >
                        <ListItemText primary={menuItem.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </nav>
            </Box>
          </div>
        </Grid>
        <Grid item md={9} xs={12}>
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/product/:id" element={<AdminProduct />} />
            <Route path="*" element={<Navigate replace to="/admin" />} />
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
}
