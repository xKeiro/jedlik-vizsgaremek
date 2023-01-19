import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Featured from "./Featured";

export default function Home() {
  return (
    <div className="Home">
      <div>
        <h2>Welcome!</h2>
      </div>
      <Box
        className="Home__Box"
        sx={{
          margin: "20px",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Grid item md={6} xs={12}>
            <Box>
              <h3>ITWebshop News</h3>
              <p>
                Welcome to our webshop, where we specialize in providing
                high-quality PC components for all your building and upgrading
                needs. We now have a good range of products from top brands,
                including CPUs, motherboards, graphics cards, memory, storage,
                and more. Whether you're building a budget-friendly system or a
                high-performance powerhouse, we have the parts you need to get
                the job done. With our user-friendly website and fast shipping,
                it's never been easier to find and purchase the PC parts you
                need. Browse our selection today and start building your dream
                system!
              </p>
            </Box>
            <Box marginY={20}>
              <h3>About Us</h3>
              <p>
                Our webshop is dedicated to providing PC enthusiasts with a wide
                selection of high-quality components at competitive prices. We
                understand that building or upgrading a PC can be a daunting
                task, which is why we strive to make the process as easy and
                stress-free as possible. We carry a wide range of products from
                top brands, including CPUs, motherboards, graphics cards,
                memory, storage, and more. Our team of experts is constantly
                researching and testing new products to ensure that we are
                offering the latest and greatest in PC technology. Our
                user-friendly website makes it easy to find the parts you need,
                and our fast shipping ensures that you can get your hands on
                them as soon as possible. We are dedicated to providing
                excellent customer service and are always here to answer any
                questions you may have about building or upgrading your PC. We
                are constantly looking for ways to improve our service and
                welcome your feedback.
              </p>
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Featured />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
