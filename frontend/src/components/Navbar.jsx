import React from "react";
import { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import CartContext from "../contexts/CartContext";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

export default function Navbar() {
  const auth = useContext(AuthContext);
  const shop = useContext(CartContext);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const mainMenu = [
    { name: "Home", route: "/" },
    { name: "Categories", route: "/categories" },
    { name: "Price list", route: "/pricelist" },
    { name: "Contact", route: "/contact" },
  ];

  const userMenu = [
    { name: "Account", route: "/account" },
    { name: "Orders", route: "/orders" },
    { name: "Logout", route: "/logout" },
  ];

  const adminMenu = [{ name: "Manage", route: "/admin/" }];

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="Navbar">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ITwebshop
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {mainMenu.map((page) => (
                  <MenuItem
                    key={"menutext-" + page.name}
                    onClick={handleCloseNavMenu}
                    component={RouterLink}
                    to={page.route}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}

                {auth.loggedIn && auth.user.isAdmin
                  ? adminMenu.map((page) => (
                      <MenuItem
                        key={"menutext-" + page.name}
                        onClick={handleCloseNavMenu}
                        component={RouterLink}
                        to={page.route}
                      >
                        <Typography textAlign="center" color={"primary"}>
                          {page.name}
                        </Typography>
                      </MenuItem>
                    ))
                  : ""}
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to={"/"}
              //href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                //letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              IT Webshop
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {mainMenu.map((page) => (
                <Button
                  key={"menubutton-" + page.name}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.route}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}

              {auth.loggedIn && auth.user.isAdmin
                ? adminMenu.map((page) => (
                    <Button
                      key={"menubutton-" + page.name}
                      onClick={handleCloseNavMenu}
                      component={RouterLink}
                      to={page.route}
                      sx={{ my: 2, color: "orange", display: "block" }}
                    >
                      {page.name}
                    </Button>
                  ))
                : ""}
            </Box>
            <Box
              sx={{ flexGrow: 0, width: 40, marginRight: 1 }}
              component={RouterLink}
              to={"/cart"}
            >
              <Tooltip title="Cart">
                <IconButton
                  color="primary"
                  aria-label="cart"
                  component="span"
                  sx={{ color: "white" }}
                >
                  <Badge badgeContent={shop.cart.length} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
            {auth.loggedIn ? (
              <>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open User Menu">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={auth.user.username}
                        src={
                          auth.user.imagePath
                            ? process.env.REACT_APP_API +
                              "/" +
                              auth.user.imagePath
                            : null
                        }
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {auth.loggedIn ? (
                      <MenuItem
                        key={"usermenu-user"}
                        onClick={handleCloseUserMenu}
                        component={RouterLink}
                        to={"/Account"}
                      >
                        <Typography textAlign="center">
                          {auth.user.isAdmin === true ? "Admin" : "User"}:{" "}
                          {auth.user.username}
                        </Typography>
                      </MenuItem>
                    ) : (
                      ""
                    )}
                    {userMenu.map((setting) => (
                      <MenuItem
                        key={"usermenu-" + setting.name}
                        onClick={handleCloseUserMenu}
                        component={RouterLink}
                        to={setting.route}
                      >
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <Tooltip title="Login or Register">
                  <IconButton
                    component={RouterLink}
                    to={"/login"}
                    sx={{ p: 0 }}
                  >
                    <Avatar alt={""} src={""} />
                  </IconButton>
                </Tooltip>
                {/* <Button
                  component={RouterLink}
                  to={"/login"}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {"Login"}
                </Button> */}
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
