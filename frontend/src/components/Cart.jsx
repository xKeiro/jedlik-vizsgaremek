import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import CartContext from "../contexts/CartContext";
import AlertMessage from "./Shared/AlertMessage";

import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CircularProgress from "@mui/material/CircularProgress";

export default function Cart() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const shop = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const [shippers, setShippers] = useState(null);

  async function getAllShippers() {
    try {
      const response = await fetch(
        process.env.REACT_APP_API + "/api/shippers",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.title;
        console.log(errorMessage);
        return;
      }
      setShippers(responseBody);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    getAllShippers();
    setShipping(0);
    if (auth.loggedIn) {
      setVAT(auth.user.vat);
    } else {
      setVAT(27);
    }
  }, [auth.loggedIn, auth.user.vat]);

  const [VAT, setVAT] = useState(0);
  const [shipping, setShipping] = useState(0.0);
  const [selectedShipperId, setSelectedShipperId] = useState(1);
  const [amount, setAmount] = useState(0);
  const [subtotal, setSubtotal] = useState(0.0);
  const [totalVAT, setTotalVAT] = useState(0.0);
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    setAmount(shop.cart.reduce((acc, curr) => acc + curr.quantity, 0));
  }, [shop.cart]);

  useEffect(() => {
    setSubtotal(
      shop.cart.reduce((acc, curr) => acc + curr.basePrice * curr.quantity, 0)
    );
  }, [shop.cart, amount]);

  useEffect(() => {
    setTotalVAT(
      shop.cart.reduce(
        (acc, curr) => acc + curr.basePrice * (VAT / 100) * curr.quantity,
        0
      )
    );
    setTotal(subtotal + totalVAT + shipping);
  }, [shop.cart, amount, VAT, totalVAT, subtotal, shipping]);

  function handleMinus(item) {
    shop.removeProductFromCart(item.id);
    setAmount((prev) => prev - 1);
  }

  function handlePlus(item) {
    shop.addProductToCart(item);
    setAmount((prev) => prev + 1);
  }

  function handleRemove(item) {
    shop.removeProductsFromCart(item);
    setAmount((prev) => prev + item.quantity);
  }

  function handleShippingSelect(item) {
    setSelectedShipperId(item.id);
    setShipping(item.price);
  }

  function handleEmptyCart() {
    shop.cart.forEach((item) => {
      shop.removeProductsFromCart(item);
    });
  }

  async function handleCheckoutButton() {
    setErrorText("");
    setSuccessText("");
    setIsLoading(true);
    const productOrders = [];
    shop.cart.forEach((item) => {
      const po = {
        productId: item.id,
        quantity: item.quantity,
      };
      productOrders.push(po);
    });
    const checkoutRequestBody = {
      shipperId: selectedShipperId,
      productOrders: productOrders,
    };
    console.log("Checkout Request Body:", checkoutRequestBody);
    try {
      const response = await fetch(
        process.env.REACT_APP_API + "/api/orders/checkout",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(checkoutRequestBody),
        }
      );
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.title;
        console.log(errorMessage);
        console.log(responseBody);
        setIsLoading(false);
        setErrorText(errorMessage);
        return;
      }
      handleEmptyCart();
      setIsLoading(false);
      setSuccessText(
        "Order Successful, you order number is: " +
          responseBody.id +
          " Redirecting to your orders..."
      );
      setTimeout(() => {
        navigate("/orders/");
      }, 3000);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <div className="Cart">
      <Box>
        <Paper elevation={2}>
          <h2>Cart</h2>
        </Paper>
      </Box>
      <Box
        className="Cart__Box"
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
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} md={12}>
            <Box>
              <Paper elevation={2}>
                <h3>Items in Cart</h3>
              </Paper>
            </Box>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 600 }} aria-label="items in cart">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Unit price</TableCell>
                    <TableCell align="right">Order amount</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shop.cart.length > 0 ? (
                    shop.cart.map((item) => (
                      <TableRow
                        key={item.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        hover
                      >
                        <TableCell component="th" scope="row">
                          <Link
                            component={RouterLink}
                            to={"/product/" + item.id}
                          >
                            {item.title}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          {item.basePrice.toLocaleString("en-US", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="primary"
                            aria-label="remove one"
                            disabled={item.quantity < 1}
                            onClick={() => handleMinus(item)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          {" " + item.quantity + " "}
                          <IconButton
                            color="primary"
                            aria-label="add one"
                            disabled={item.stock <= item.quantity}
                            onClick={() => handlePlus(item)}
                          >
                            <AddIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            onClick={() => handleRemove(item)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        colSpan={4}
                      >
                        Your cart is empty.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box>
              <Paper elevation={2}>
                <h3>Shipping</h3>
              </Paper>
            </Box>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="shiping">
                <TableHead>
                  <TableRow>
                    <TableCell>Shipping Method</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shippers && shippers.length > 0 ? (
                    shippers.map((shipper) => (
                      <TableRow
                        key={shipper.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        hover
                      >
                        <TableCell component="th" scope="row">
                          {shipper.companyName}
                        </TableCell>
                        <TableCell align="right">
                          {shipper.price !== 0.0
                            ? shipper.price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "EUR",
                              })
                            : "Free"}
                        </TableCell>

                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleShippingSelect(shipper)}
                            disabled={selectedShipperId === shipper.id}
                          >
                            {selectedShipperId === shipper.id
                              ? "Selected"
                              : "Select"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        colSpan={3}
                      >
                        No shipping available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} md={12} paddingBottom={2}>
            <Paper elevation={3}>
              <Box>
                <Paper elevation={2}>
                  <h3>Order Summary</h3>
                </Paper>
              </Box>
              <Box>
                {successText && (
                  <AlertMessage type="success" message={successText} />
                )}
                {errorText && <AlertMessage type="error" message={errorText} />}
                {isLoading && <CircularProgress />}
              </Box>
              <List>
                {shop.cart.length > 0 ? (
                  <>
                    {auth.loggedIn ? (
                      <ListItem>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText
                          primary={`VAT in your country: ${VAT}%`}
                        />
                      </ListItem>
                    ) : (
                      <ListItem>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary={`VAT in Hungary: ${VAT}%`} />
                      </ListItem>
                    )}

                    <ListItem>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary={`Amount of items: ${amount}`} />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText
                        primary={`Subtotal: ${subtotal.toLocaleString("en-US", {
                          style: "currency",
                          currency: "EUR",
                        })}`}
                      />
                    </ListItem>

                    <Divider />

                    <ListItem>
                      <ListItemIcon>+</ListItemIcon>
                      <ListItemText
                        primary={`VAT: ${totalVAT.toLocaleString("en-US", {
                          style: "currency",
                          currency: "EUR",
                        })} (${VAT}%)`}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>+</ListItemIcon>
                      <ListItemText
                        primary={`Shipping: ${shipping.toLocaleString("en-US", {
                          style: "currency",
                          currency: "EUR",
                        })}`}
                      />
                    </ListItem>

                    <Divider />

                    <ListItem>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText
                        primary={`Total: ${total.toLocaleString("en-US", {
                          style: "currency",
                          currency: "EUR",
                        })}`}
                      />
                    </ListItem>
                  </>
                ) : (
                  <ListItem>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="Your cart is empty." />
                  </ListItem>
                )}
              </List>
              {auth.loggedIn ? (
                <>
                  <Button
                    disabled={shop.cart.length < 1 || !selectedShipperId}
                    variant="contained"
                    onClick={handleCheckoutButton}
                    sx={{ marginY: "10px", paddingY: "10px" }}
                  >
                    Checkout
                  </Button>
                  <Box paddingY={1}>
                    <p>
                      Please note that clicking on the Checkout button entails
                      payment obligation.
                    </p>
                  </Box>
                </>
              ) : (
                <Box paddingY={2}>
                  <Link component={RouterLink} to={"/login"}>
                    Checkout requires signing in.
                  </Link>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
