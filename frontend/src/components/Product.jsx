import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

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
      <div>{product ? <div>{product.title}</div> : <CircularProgress />}</div>
    </div>
  );
}
