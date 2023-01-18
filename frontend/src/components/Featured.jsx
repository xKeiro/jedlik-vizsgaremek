import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

export default function Featured() {
  const [products, setProducts] = useState(null);

  async function getProducts() {
    try {
      const response = await fetch(
        "http://localhost:8000/api/products/featured",
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
    getProducts();
  }, []);

  return (
    <div className="Featured">
      <div>
        <h3>Featured Products</h3>
      </div>
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
