import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "./ProductCard";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import CategoryBar from "./CategoryBar";

export default function Category() {
  const { id } = useParams();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function getCategoryProducts() {
      if (!id) {
        setProducts([]);
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/category/${id}`,
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
    getCategoryProducts();
  }, [id]);

  return (
    <div className="Category">
      <Box
        className="Category__Box"
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
          direction="row-reverse"
          justifyContent="center"
          spacing={2}
          sx={{ marginBottom: 3 }}
        >
          <Grid item xs={12} md={9}>
            <Box>
              <Paper elevation={2}>
                <h3>Products in this category</h3>
              </Paper>
            </Box>
            <Grid container direction="row" spacing={2}>
              {products ? (
                products.map((product) => (
                  <Grid item key={product.id} xs={12} md={6}>
                    <ProductCard product={product} />
                  </Grid>
                ))
              ) : (
                <CircularProgress />
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <CategoryBar
              currentCategoryId={products ? products[0].categoryId : null}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
