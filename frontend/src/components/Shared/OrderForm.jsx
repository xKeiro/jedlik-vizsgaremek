import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function OrderForm({ order }) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12} md={12}>
        <Typography>Order details</Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField
          variant="filled"
          fullWidth
          label="Order Number"
          id="id"
          name="id"
          type="text"
          value={order.id}
          autoComplete="off"
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <TextField
          variant="filled"
          fullWidth
          label="Order Status"
          id="status"
          name="status"
          type="text"
          value={order.status}
          autoComplete="off"
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <TextField
          variant="filled"
          fullWidth
          label="Order Date"
          id="dorderDate"
          name="orderDate"
          type="text"
          value={new Date(Date.parse(order.orderDate)).toLocaleString()}
          autoComplete="off"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          variant="filled"
          fullWidth
          label="Client First Name"
          id="user.firstName"
          name="user.firstName"
          type="text"
          value={order.user.firstName}
          autoComplete="off"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          variant="filled"
          fullWidth
          label="Client Last Name"
          id="user.lastName"
          name="user.lastName"
          type="text"
          value={order.user.lastName}
          autoComplete="off"
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <TextField
          variant="filled"
          fullWidth
          label="VAT"
          id="vat"
          name="vat"
          type="text"
          value={order.vat + " %"}
          autoComplete="off"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          variant="filled"
          fullWidth
          label="Subtotal"
          id="orderTotal"
          name="orderTotal"
          type="text"
          value={order.orderTotal.toLocaleString("en-US", {
            style: "currency",
            currency: "EUR",
          })}
          autoComplete="off"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          variant="filled"
          fullWidth
          label="Subtotal with VAT"
          id="orderTotalWithVat"
          name="orderTotalWithVat"
          type="text"
          value={order.orderTotalWithVat.toLocaleString("en-US", {
            style: "currency",
            currency: "EUR",
          })}
          autoComplete="off"
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <TextField
          variant="filled"
          fullWidth
          label="Total"
          id="orderTotalWithShipping"
          name="orderTotalWithShipping"
          type="text"
          value={order.orderTotalWithShipping.toLocaleString("en-US", {
            style: "currency",
            currency: "EUR",
          })}
          autoComplete="off"
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <Typography>Ordered products</Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        <TableContainer component={Paper}>
          <Table aria-label="Ordered products">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.productOrders ? (
                order.productOrders.map((productOrder) => (
                  <TableRow
                    key={productOrder.product.id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                    hover
                  >
                    <TableCell component="th" scope="row">
                      <Link
                        component={RouterLink}
                        to={"/product/" + productOrder.product.id}
                      >
                        {productOrder.product.title}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{productOrder.quantity}</TableCell>
                    <TableCell align="right">
                      {productOrder.basePrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "EUR",
                      })}
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
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12} md={12}>
        <Typography>Shipping</Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        <TextField
          variant="filled"
          fullWidth
          label="Shipper"
          id="shipper"
          name="shipper"
          type="text"
          value={order.shipperName}
          autoComplete="off"
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField
          variant="filled"
          fullWidth
          label="Shipping Price"
          id="shippingPrice"
          name="shippingPrice"
          type="text"
          value={order.shippingPrice}
          autoComplete="off"
        />
      </Grid>
    </Grid>
  );
}
