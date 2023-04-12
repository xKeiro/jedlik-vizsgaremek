import React from "react";

import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";

export default function Header() {
  return (
    <div className="Header">
      <Paper>
        <Box sx={{ marginY: 2 }}>
          <CardMedia
            height="150px"
            component="img"
            image="/images/header.jpg"
          ></CardMedia>
        </Box>
      </Paper>
    </div>
  );
}
