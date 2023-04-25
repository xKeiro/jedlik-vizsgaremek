import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router";
import CategoryBar from "./CategoryBar";
import Reviews from "./Reviews";
import AuthContext from "../contexts/AuthContext";
import CartContext from "../contexts/CartContext";

import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CircularProgress from "@mui/material/CircularProgress";
import UserReview from "./User/UserReview";

export default function Product() {
  const { id } = useParams();
  const auth = useContext(AuthContext);
  const shop = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function getProduct() {
      if (!id) {
        setProduct(null);
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`,
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
          sx={{ marginBottom: 3 }}
        >
          <Grid item xs={12} md={9}>
            {product ? (
              <>
                <Box>
                  <Paper elevation={2}>
                    <h3>Product</h3>
                  </Paper>
                </Box>
                <Card key={product.id}>
                  <Paper elevation={3}>
                    <CardMedia
                      sx={{ height: 400 }}
                      component="img"
                      image={"/images/placeholder.png"}
                      alt={product.title}
                    />
                    <CardContent>
                      <Paper elevation={3}>
                        <Typography gutterBottom variant="h4" component="div">
                          {!product.discontinued
                            ? product.title
                            : product.title + "(Discontinued)"}
                        </Typography>
                      </Paper>
                      <Typography gutterBottom variant="h6" component="div">
                        {product.description}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {product.stock ? "In stock" : "Out of stock"}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {product.basePrice.toLocaleString("en-US", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        color="primary"
                        variant="outlined"
                        disabled={
                          product.stock && !product.discontinued ? false : true
                        }
                        onClick={() => shop.addProductToCart(product)}
                      >
                        Add to cart
                      </Button>
                    </CardActions>
                    <CardContent>
                      <Reviews productId={product.id} />
                      {auth.loggedIn ? (
                        <UserReview productId={product.id} />
                      ) : (
                        <Box paddingY={2}>
                          <Link component={RouterLink} to={"/login"}>
                            Writing reviews requires sign-in.
                          </Link>
                        </Box>
                      )}
                    </CardContent>
                  </Paper>
                </Card>
              </>
            ) : (
              <CircularProgress />
            )}
          </Grid>
          <Grid item md={3} xs={12}>
            <CategoryBar
              currentCategoryId={product ? product.categoryId : null}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
