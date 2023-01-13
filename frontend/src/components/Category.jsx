import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "./ProductCard";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import CategoryBar from "./CategoryBar";

export default function Category() {
  const { id } = useParams();
  const [products, setProducts] = useState(null);

  async function getCategoryProducts() {
    if (!id) {
      setProducts([]);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8000/api/categories/${id}`,
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
    getCategoryProducts();
  }, [id]);

  return (
    <div className="Category">
      <Box
        className="Categories__Box"
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
        >
          <Grid item xs={12} md={9}>
            <div>
              <h2>{products ? "Products in this category" : "Category"}</h2>
            </div>
            <Grid container direction="row" justifyContent="center" spacing={2}>
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
              currentCategoryId={products ? products[0].category_id : null}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
