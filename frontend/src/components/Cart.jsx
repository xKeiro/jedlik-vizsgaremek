import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import CartContext from "../contexts/CartContext";

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
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Cart() {
  const auth = useContext(AuthContext);
  const shop = useContext(CartContext);

  const shippers = [
    { id: 1, title: "Personal collection", price: 0.0 },
    { id: 2, title: "Post", price: 9.99 },
    { id: 3, title: "Courier", price: 14.99 },
  ];

  const [VAT, setVAT] = useState(0);
  const [shipping, setShipping] = useState(0.0);
  const [shipperId, setShipperId] = useState(1);
  const [amount, setAmount] = useState(0);
  const [subtotal, setSubtotal] = useState(0.0);
  const [totalVAT, setTotalVAT] = useState(0.0);
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    setAmount(shop.cart.reduce((acc, curr) => acc + curr.quantity, 0));
    setVAT(27);
    setShipping(0);
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
    setShipperId(item.id);
    setShipping(item.price);
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
                        The cart is empty.
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
                <h3>Shipping (WIP)</h3>
              </Paper>
            </Box>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="shiping">
                <TableHead>
                  <TableRow>
                    <TableCell>Method</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shippers.length > 0 ? (
                    shippers.map((shipper) => (
                      <TableRow
                        key={shipper.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        hover
                      >
                        <TableCell component="th" scope="row">
                          {shipper.title}
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
                            disabled={shipperId === shipper.id}
                          >
                            {shipperId === shipper.id ? "Selected" : "Select"}
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

          {shop.cart.length > 0 ? (
            <Grid item xs={12} md={12} paddingBottom={2}>
              <Paper elevation={3}>
                <Box>
                  <Paper elevation={2}>
                    <h3>Order Summary</h3>
                  </Paper>
                </Box>
                <p>Total amount of items: {amount}</p>
                <p>
                  Subtotal:{" "}
                  {subtotal.toLocaleString("en-US", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </p>
                <p>
                  + VAT:{" "}
                  {totalVAT.toLocaleString("en-US", {
                    style: "currency",
                    currency: "EUR",
                  })}{" "}
                  ({VAT}%)
                </p>
                <p>
                  + Shipping:{" "}
                  {shipping.toLocaleString("en-US", {
                    style: "currency",
                    currency: "EUR",
                  })}{" "}
                </p>
                <p>
                  <b>
                    Total:{" "}
                    {total.toLocaleString("en-US", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </b>
                </p>

                {auth.loggedIn ? (
                  <>
                    <Button
                      disabled={shop.cart.length < 1}
                      variant="contained"
                      component={RouterLink}
                      to={"/checkout"}
                      sx={{ marginY: "10px", paddingY: "10px" }}
                    >
                      Checkout (WIP)
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
          ) : (
            ""
          )}
        </Grid>
      </Box>
    </div>
  );
}
