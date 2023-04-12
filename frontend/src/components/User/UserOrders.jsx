import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default function UserOrders() {
  return (
    <div className="Orders">
      <Box>
        <Paper elevation={2}>
          <h2>Your Orders</h2>
        </Paper>
      </Box>
      <div>Orders placeholder</div>
    </div>
  );
}
