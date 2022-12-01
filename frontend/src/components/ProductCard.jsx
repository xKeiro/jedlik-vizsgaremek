import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function ProductCard({ product }) {
  return (
    <Card key={product.id} sx={{ maxWidth: 345 }}>
      <CardActionArea component={RouterLink} to={"/product/" + product.id}>
        <CardMedia
          component="img"
          height="140"
          image={
            product.photo
              ? product.photo
              : "https://via.placeholder.com/150x150.png"
          }
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.sale_price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
