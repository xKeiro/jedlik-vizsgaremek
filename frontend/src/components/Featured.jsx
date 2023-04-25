import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "./Shared/ProductCard";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

export default function Featured() {
  const [products, setProducts] = useState(null);

  async function getProducts() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products/featured",
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
      setProducts(responseBody);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="Featured">
      <Box>
        <Paper elevation={2}>
          <h3>Featured Products</h3>
        </Paper>
      </Box>
      <div className="Category">
        <Box
          className="Featured__Box"
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
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ maxWidth: 340 }}
          >
            {products ? (
              products.map((product) => (
                <Grid item key={product.id} xs={12} md={4}>
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12} md={4}>
                <CircularProgress />
              </Grid>
            )}
          </Grid>
        </Box>
      </div>
    </div>
  );
}
