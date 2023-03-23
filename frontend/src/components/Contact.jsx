import React from "react";
import Box from "@mui/material/Box";

export default function Contact() {
  return (
    <div className="Contact">
      <div>
        <h2>Contact Us</h2>
      </div>
      <Box
        className="Contact__Box"
        sx={{
          margin: "20px",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <div>
          <p>
            Thank you for visiting our webshop. We value your feedback and are
            always here to help with any questions or concerns you may have. If
            you need assistance with your order, have a question about a product
            or simply want to provide feedback, please don't hesitate to contact
            us.
          </p>
        </div>
        <div>
          <h3>IT Webhop Kft.</h3>
        </div>
        <p>Email address: info@itwebshop.hu</p>
        <p>Phone: +36555479368</p>
        <p>
          Address: Győr, Some street 66.
          <br />
          9000 Hungary
        </p>
      </Box>
    </div>
  );
}
