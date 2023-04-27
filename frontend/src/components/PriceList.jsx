import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import CartContext from "../contexts/CartContext";

import Paper from "@mui/material/Paper";
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
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from 'react-infinite-scroller';

export default function PriceList() {
  const shop = useContext(CartContext);
  const pageSize = 10;

  const [products, setProducts] = useState(null);
  const [nextPage, setNextPage] = useState(1);

  async function getProducts(pageToLoad) {
    try {
      const response = await fetch(
        process.env.REACT_APP_API + `/api/products?page=${pageToLoad}&pageSize=${pageSize}`,
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
      if (products === null) {
        setProducts(responseBody.products);
      }
      else {
        setProducts(products.concat(responseBody.products));
      }
      setNextPage(responseBody.nextPage);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    getProducts(nextPage);
  }, []);

  return (
    <div className="PriceList">
      <Box>
        <Paper elevation={2}>
          <h2>Price List</h2>
        </Paper>
      </Box>
      <Box
        className="PriceList__Box"
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
          <InfiniteScroll
                    pageStart={0}
                    loadMore={() => getProducts(nextPage)}
                    hasMore={nextPage !== null}
                    loader={<CircularProgress key="loading"/>}
                    >
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 600 }}
                size="small"
                aria-label="simple table"
              >
                <TableHead key="header">
                  <TableRow key="headerRow">
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Stock</TableCell>
                    <TableCell align="right">Action</TableCell>
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
                        hover
                      >
                        <TableCell component="th" scope="row">
                          <Link
                            component={RouterLink}
                            to={"/product/" + product.id}
                          >
                            {product.title}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          {product.basePrice.toLocaleString("en-US", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </TableCell>
                        <TableCell align="right">
                          {product.stock ? "In stock" : "Out of stock"}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            disabled={
                              product.stock && !product.discontinued
                                ? false
                                : true
                            }
                            onClick={() => shop.addProductToCart(product)}
                          >
                            Add to cart
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      key={"firstload"}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        colSpan={4}
                      >
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            </InfiniteScroll>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
