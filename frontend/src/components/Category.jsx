import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

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

  useEffect(() => {
    getCategoryProducts();
  }, []);

  return (
    <div className="Category">
      <div>
        <h2>{products ? "Category Name" : "Category"}</h2>
      </div>
      <div>
        {products ? (
          products.map((product) => <div>{product.title}</div>)
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
}
