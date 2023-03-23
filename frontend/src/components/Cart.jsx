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

  const [amount, setAmount] = useState(0);
  const [subtotal, setSubtotal] = useState(0.0);
  const [VAT, setVAT] = useState(0);
  const [total, setTotal] = useState(0.0);
  const [shipping, setShipping] = useState(0.0);

  useEffect(() => {
    setAmount(shop.cart.reduce((acc, curr) => acc + curr.quantity, 0));
    setVAT(27);
    setShipping(0);
  }, [shop.cart]);

  useEffect(() => {
    setSubtotal(
      shop.cart.reduce((acc, curr) => acc + curr.base_price * curr.quantity, 0)
    );
    setTotal(subtotal * (VAT / 100) + shipping);
  }, [shop.cart, shop.cart.length, amount, VAT, subtotal, shipping]);

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

  return (
    <div className="Cart">
      <div>
        <h2>Cart</h2>
      </div>
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
            <h3>Items in Cart</h3>
          </Grid>
          <Grid item xs={12} md={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                          {item.base_price.toLocaleString("en-US", {
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
            <h3>Shipping (WIP)</h3>
          </Grid>
          <Grid item xs={12} md={12}>
            <h3>Order Summary</h3>
          </Grid>
          <Grid item xs={12} md={12}>
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
              {((subtotal * VAT) / 100).toLocaleString("en-US", {
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
          </Grid>
          <Grid item xs={12} md={12}>
            {auth.token ? (
              <>
                <Button
                  disabled={shop.cart.length < 1}
                  variant="outlined"
                  component={RouterLink}
                  to={"/checkout"}
                >
                  Checkout (WIP)
                </Button>
                <p>
                  Please note that clicking on the Checkout button entails
                  payment obligation.
                </p>
              </>
            ) : (
              <p>
                <Link component={RouterLink} to={"/login"}>
                  Checkout requires a signed in user.
                </Link>
              </p>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
