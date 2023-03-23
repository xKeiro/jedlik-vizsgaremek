import React from "react";
import Box from "@mui/material/Box";

export default function Cart() {
  return (
    <div className="Cart">
      <div>
        <h2>Cart</h2>
      </div>
      <Box
        className="Cart__Box"
        sx={{
          margin: "20px",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignContent: "center",
        }}
      ></Box>
    </div>
  );
}
