import React from "react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

export default function AdminShippers() {
  const [shippers, setShippers] = useState(null);

  async function getAllShippers() {
    try {
      const response = await fetch("http://localhost:5000/api/shippers", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.title;
        console.log(errorMessage);
        return;
      }
      setShippers(responseBody);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    getAllShippers();
  }, []);

  async function handleRemove(id) {
    try {
      const response = await fetch(`http://localhost:5000/api/shippers/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const responseBody = await response.json();
      console.log(responseBody);
      if (!response.ok) {
        const errorMessage = responseBody.detail[0].msg;
        console.log(errorMessage);
        return;
      }
      getAllShippers();
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <div className="AdminShippers">
      <Box>
        <Paper elevation={2}>
          <h3>Shippers Management</h3>
        </Paper>
      </Box>
      <Box
        className="AdminShippers__Box"
        sx={{
          margin: "20px",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} md={12}>
            <Button
              variant="outlined"
              component={RouterLink}
              to={"/admin/shipper"}
            >
              Add new
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="table">
                <TableHead>
                  <TableRow>
                    <TableCell>Company</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shippers ? (
                    shippers.map((shipper) => (
                      <TableRow
                        key={shipper.id}
                        data-id={shipper.id}
                        data-title={shipper.title}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        hover
                      >
                        <TableCell component="th" scope="row">
                          <Link
                            component={RouterLink}
                            to={"/admin/shipper/" + shipper.id}
                          >
                            {shipper.companyName}
                          </Link>
                        </TableCell>
                        <TableCell align="right">{shipper.email}</TableCell>
                        <TableCell align="right">{shipper.price}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            component={RouterLink}
                            to={"/admin/shipper/" + shipper.id}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            sx={{ marginLeft: 1 }}
                            onClick={() => handleRemove(shipper.id)}
                            disabled={shipper.disabled}
                          >
                            {shipper.disabled ? "Disabled" : "Disable"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        colSpan={4}
                      >
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
