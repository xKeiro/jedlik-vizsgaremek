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
            component="img"
            src="https://placeimg.com/1200/120/tech"
          ></CardMedia>
        </Box>
      </Paper>
    </div>
  );
}
