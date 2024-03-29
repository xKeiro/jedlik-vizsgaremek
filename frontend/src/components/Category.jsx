import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "./Shared/ProductCard";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import CategoryBar from "./Shared/CategoryBar";
import InfiniteScroll from "react-infinite-scroller";

export default function Category() {
  const { id } = useParams();
  const pageSize = 6;
  const [products, setProducts] = useState(null);
  const [nextPage, setNextPage] = useState(1);

  async function getCategoryProducts(pageToLoad) {
    if (!id) {
      setProducts([]);
      return;
    }
    try {
      const response = await fetch(
        process.env.REACT_APP_API +
          `/api/products/category/${id}?page=${pageToLoad}&pageSize=${pageSize}`,
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
      } else {
        if (products === null) {
          setProducts(responseBody.products);
        } else {
          setProducts(products.concat(responseBody.products));
        }
        setNextPage(responseBody.nextPage);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
  useEffect(() => {
    setProducts(null);
    setNextPage(1);
    getCategoryProducts(1);
  }, [id]);

  return (
    <div className="Category">
      <InfiniteScroll
        pageStart={0}
        loadMore={() => getCategoryProducts(nextPage)}
        hasMore={nextPage !== null}
        loader={<CircularProgress key="loading" />}
      >
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
                  <div></div>
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
      </InfiniteScroll>
    </div>
  );
}
