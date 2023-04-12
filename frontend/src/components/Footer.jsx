import React from "react";
import { ColorModeContext } from "../contexts/ColorModeContext";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

export default function Footer() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const currentYear = new Date().getFullYear();
  return (
    <div className="Footer">
      <Box sx={{ marginTop: "20px" }}>
        <Box>
          <span>
            <small>{currentYear} ITwebshop Kft. All rights reserved.</small>
          </span>
        </Box>
      </Box>
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </div>
  );
}
