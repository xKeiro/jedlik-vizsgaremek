import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

export default function Admin() {
  const adminMenu = [
    { name: "Home", route: "/admin/" },
    { name: "Orders", route: "/admin/orders" },
    { name: "Products", route: "/admin/products" },
    { name: "Categories", route: "/admin/categories" },
    { name: "Suppliers", route: "/admin/suppliers" },
    { name: "Shippers", route: "/admin/shippers" },
    { name: "Reviews", route: "/admin/reviews" },
    { name: "Users", route: "/admin/users" },
  ];

  const location = useLocation();

  return (
    <div className="Admin">
      <Box>
        <Paper elevation={2}>
          <h2>Management Panel</h2>
        </Paper>
      </Box>
      <Box
        className="Admin__Box"
        sx={{
          margin: "20px",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ marginBottom: 3 }}
        >
          <Grid item md={3} xs={12}>
            <Box>
              <Paper elevation={2}>
                <h3>Pages</h3>
              </Paper>
            </Box>
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
              <nav aria-label="admin pages">
                <Divider />
                <List>
                  {adminMenu.map((menuItem) => (
                    <ListItem key={menuItem.name} disablePadding>
                      <ListItemButton
                        selected={menuItem.route === location.pathname}
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
          </Grid>
          <Grid item md={9} xs={12}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
