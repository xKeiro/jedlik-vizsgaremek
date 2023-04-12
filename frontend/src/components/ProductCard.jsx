import React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import CartContext from "../contexts/CartContext";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

export default function ProductCard({ product }) {
  const cart = useContext(CartContext);
  return (
    <>
      <Card
        key={product.id}
        sx={
          product.featured
            ? {
                border: "1px solid",
                borderColor: "primary.main",
                minWidth: 350,
                maxWidth: 400,
              }
            : {
                border: "1px solid transparent",
                minWidth: 350,
                maxWidth: 400,
              }
        }
      >
        <CardActionArea component={RouterLink} to={"/product/" + product.id}>
          <CardMedia
            component="img"
            height="150"
            image="/images/placeholder.png"
            alt={product.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
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
        </CardActionArea>
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
  );
}
