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

export default function AdminProducts() {
  const [products, setProducts] = useState(null);

  async function getAllProducts() {
    try {
      const response = await fetch("http://localhost:8000/api/products/all", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.detail[0].msg;
        console.log(errorMessage);
        return;
      }
      setProducts(responseBody.products);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="AdminProducts">
      <div>
        <h3>Products Editor</h3>
      </div>
      <Box
        className="Products__Box"
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
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Stock</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products ? (
                    products.map((product) => (
                      <TableRow
                        key={product.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {product.featured ? "[Featured] " : null}
                          {product.discontinued ? " [Discontinued] " : null}
                          <Link
                            component={RouterLink}
                            to={"/product/" + product.id}
                          >
                            {product.title}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          {product.sale_price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </TableCell>
                        <TableCell align="right">{product.stock}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            component={RouterLink}
                            to={"/admin/product/" + product.id}
                          >
                            Edit
                          </Button>
                          <Button variant="outlined">Remove</Button>
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
