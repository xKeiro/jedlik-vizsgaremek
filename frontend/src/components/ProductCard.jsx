import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function ProductCard({ product }) {
  return (
    <>
      <Card
        key={product.id}
        sx={
          product.featured
            ? { maxWidth: 400, border: 1, borderColor: "primary.main" }
            : { maxWidth: 400 }
        }
      >
        <CardActionArea component={RouterLink} to={"/product/" + product.id}>
          <CardMedia
            component="img"
            height="150"
            image={
              product.photo
                ? product.photo
                : "https://placeimg.com/400/150/tech"
            }
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
              {product.sale_price.toLocaleString("en-US", {
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
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
