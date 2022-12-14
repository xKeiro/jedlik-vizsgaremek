import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  async function getProduct() {
    if (!id) {
      setProduct(null);
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.detail[0].msg;
        console.log(errorMessage);
        return;
      }
      console.log(responseBody);
      setProduct(responseBody);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="Product">
      <div>
        <h2>{product ? product.title : "Product"}</h2>
      </div>
      <div>
        {product ? (
          <Card key={product.id} sx={{}}>
            <CardMedia
              component="img"
              height="500"
              image={
                product.photo
                  ? product.photo
                  : "https://via.placeholder.com/1920x1080.png"
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
                {product.sale_price.toLocaleString("en-US", {
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
              >
                Add to cart
              </Button>
            </CardActions>
          </Card>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
}
