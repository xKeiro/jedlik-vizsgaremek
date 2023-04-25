import React from "react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

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
import CircularProgress from "@mui/material/CircularProgress";

export default function AdminOrders() {
  const [orders, setOrders] = useState(null);

  async function getOrders() {
    try {
      const response = await fetch("http://localhost:5000/api/orders/me", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.title;
        console.log(errorMessage);
        return;
      }
      console.log(responseBody);
      setOrders(responseBody);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="UserOrders">
      <Box>
        <Paper elevation={2}>
          <h2>Your Orders</h2>
        </Paper>
      </Box>
      <Box
        className="UserOrders__Box"
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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 600 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Order Number</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders ? (
                    orders.map((order) => (
                      <TableRow
                        key={order.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        hover
                      >
                        <TableCell component="th" scope="row">
                          <Link
                            component={RouterLink}
                            to={"/order/" + order.id}
                          >
                            {order.id}
                          </Link>
                        </TableCell>
                        <TableCell align="right">{order.status}</TableCell>
                        <TableCell align="right">
                          {order.orderTotalWithShipping.toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: "EUR",
                            }
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {new Date(
                            Date.parse(order.orderDate)
                          ).toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            component={RouterLink}
                            to={"/order/" + order.id}
                          >
                            View
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
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
