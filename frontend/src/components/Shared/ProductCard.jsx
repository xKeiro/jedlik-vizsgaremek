import React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import CartContext from "../../contexts/CartContext";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

export default function ProductCard({ product }) {
  const shop = useContext(CartContext);
  return (
    <Box>
      <Card
        key={product.id}
        sx={
          product.featured
            ? {
                border: "1px solid",
                borderColor: "text.secondary",
                maxWidth: 400,
              }
            : {
                border: "1px solid transparent",
                maxWidth: 400,
              }
        }
      >
        <Paper elevation={3}>
          <CardActionArea component={RouterLink} to={"/product/" + product.id}>
            <CardMedia
              component="img"
              sx={{ height: 150 }}
              image={
                product.imagePath
                  ? process.env.REACT_APP_API + "/" + product.imagePath
                  : "/images/placeholder.png"
              }
              title={product.title}
            />
            <CardContent sx={{ minHeight: 140 }}>
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.stock ? "In stock" : "Out of stock"}
              </Typography>
              {product.discount ? (
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {product.basePrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </Typography>
                  <Typography variant="body1" color="primary">
                    {(
                      product.basePrice -
                      product.basePrice * (product.discount / 100)
                    ).toLocaleString("en-US", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </Typography>
                </>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  {product.basePrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              disabled={product.stock && !product.discontinued ? false : true}
              onClick={() => shop.addProductToCart(product)}
            >
              Add to cart
            </Button>
          </CardActions>
        </Paper>
      </Card>
    </Box>
  );
}
