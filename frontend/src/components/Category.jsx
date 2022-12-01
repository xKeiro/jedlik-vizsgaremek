import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "./ProductCard";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

export default function Category() {
  const { id } = useParams();
  const [products, setProducts] = useState(null);

  async function getCategoryProducts() {
    if (!id) {
      setProducts(null);
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
      console.log(responseBody);
      setProducts(responseBody.products);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  function getMockProducts() {
    const mockObj = {
      products: [
        {
          id: "1",
          sale_price: 10000,
          title: "Sample Product 1",
          description: "asd",
          photo: "",
          stock: 100,
          discontinued: false,
        },
        {
          id: "2",
          sale_price: 100000,
          title: "sample product 2",
          description: "asd",
          photo: "",
          stock: 100,
          discontinued: false,
        },
        {
          id: "3",
          sale_price: 1000000,
          title: "sample product 3",
          description: "asd",
          photo: "",
          stock: 100,
          discontinued: false,
        },
        {
          id: "4",
          sale_price: 100,
          title: "sample product 4",
          description: "asd",
          photo: "",
          stock: 100,
          discontinued: false,
        },
        {
          id: "5",
          sale_price: 480,
          title: "outofstock product",
          description: "asd",
          photo: "",
          stock: 0,
          discontinued: false,
        },
      ],
    };
    setProducts(mockObj.products);
  }

  useEffect(() => {
    getMockProducts();
  }, []);

  return (
    <div className="Category">
      <div>
        <h2>{products ? "Category Name" : "Category"}</h2>
      </div>
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
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {products ? (
            products.map((product) => (
              <Grid item key={product.id} xs={12} md={4}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Box>
    </div>
  );
}
