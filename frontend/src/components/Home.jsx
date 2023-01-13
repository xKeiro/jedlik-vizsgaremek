import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Featured from "./Featured";

export default function Home() {
  return (
    <div className="Home">
      <h2>Welcome!</h2>
      <Grid
        container
        direction="row"
        justifyContent="center"
        //alignItems="center"
        spacing={2}
      >
        <Grid item md={6} xs={12}>
          <Box>
            <h3>News</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quibusdam nobis suscipit error, officiis earum quia maxime sunt
              nostrum expedita modi explicabo reiciendis consectetur quod itaque
              nihil molestiae est in fugit! Perferendis et doloribus commodi
              fugiat numquam id distinctio quaerat beatae ullam quod nesciunt
              consequatur aperiam nemo odio nobis perspiciatis culpa, maxime
              inventore placeat at repellendus. Asperiores officiis odit aliquam
              quibusdam.
            </p>
          </Box>
          <Box marginY={20}>
            <h3>About Us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quibusdam nobis suscipit error, officiis earum quia maxime sunt
              nostrum expedita modi explicabo reiciendis consectetur quod itaque
              nihil molestiae est in fugit! Perferendis et doloribus commodi
              fugiat numquam id distinctio quaerat beatae ullam quod nesciunt
              consequatur aperiam nemo odio nobis perspiciatis culpa, maxime
              inventore placeat at repellendus. Asperiores officiis odit aliquam
              quibusdam.
            </p>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Featured />
        </Grid>
      </Grid>
    </div>
  );
}
