import React from "react";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default function AdminHome() {
  return (
    <div className="AdminHome">
      <Box>
        <Paper elevation={2}>
          <h3>Have a nice day</h3>
        </Paper>
      </Box>
      <Box>
        <p>
          Welcome to the admin section of our webshop. We are glad you are here!
          This is the central hub for managing the webshop's products, orders,
          customers, and other important aspects of this business. From here,
          you can easily add new products, update inventory, fulfill orders, and
          view important data. Please be careful while managing shop related
          content.
        </p>
      </Box>
    </div>
  );
}
