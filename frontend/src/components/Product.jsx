import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import CategoryBar from "./CategoryBar";
import CartContext from "../contexts/CartContext";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function Product() {
  const { id } = useParams();
  const cart = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function getProduct() {
      if (!id) {
        setProduct(null);
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:8000/api/products/${id}`,
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
        setProduct(responseBody);
      } catch (error) {
        console.log(error);
        return;
      }
    }

    getProduct();
  }, [id]);

  return (
    <div className="Product">
      <div>
        <Box
          className="Product__Box"
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
              {product ? (
                <>
                  <div>
                    <h2>{product ? product.title : "Product"}</h2>
                  </div>
                  <Card key={product.id} sx={{ maxWidth: "800px" }}>
                    <CardMedia
                      component="img"
                      height="400"
                      image={
                        product.photo
                          ? product.photo
                          : "https://placehold.co/800x400/png"
                      }
                      alt={product.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        {product.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.stock ? "In stock" : "Out of stock"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.base_price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        disabled={product.stock ? false : true}
                        onClick={() => cart.addProductToCart(product)}
                      >
                        Add to cart
                      </Button>
                    </CardActions>
                  </Card>
                </>
              ) : (
                <CircularProgress />
              )}
            </Grid>
            <Grid item md={3} xs={12}>
              <CategoryBar
                currentCategoryId={product ? product.category_id : null}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
