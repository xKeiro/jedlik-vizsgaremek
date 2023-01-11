import React from "react";
import Grid from "@mui/material/Grid";

export default function Home() {
  return (
    <div className="Home">
      <h2>Welcome!</h2>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item md={6} xs={12}>
          <div>
            <h3>About Us</h3>
            <p>landing placeholder text...</p>
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <div>
            <h3>Featured</h3>
            <p>featured items placeholder text...</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
