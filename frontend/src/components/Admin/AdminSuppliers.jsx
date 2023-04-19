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

export default function AdminSuppliers() {
  //const [suppliers, setSuppliers] = useState(null);

  const mockSuppliers = [
    {
      id: "1",
      company_name: "Mock supplier Inc.",
      contact_first_name: "John",
      contact_last_name: "Doe",
      email: "suppliers@example.com",
      phone: "+36302222222",
    },
  ];

  async function getAllSuppliers() {
    try {
      const response = await fetch("http://localhost:8000/api/suppliers", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.detail[0].msg;
        console.log(errorMessage);
        return;
      }
      //setSuppliers(responseBody.suppliers);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    //getAllSuppliers();
  }, []);

  async function handleRemove(e) {
    //const title = e.target.parentNode.parentNode.dataset.title;
    const id = e.target.parentNode.parentNode.dataset.id;

    try {
      const response = await fetch(
        `http://localhost:8000/api/suppliers/${id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );
      const responseBody = await response.json();
      console.log(responseBody);
      if (!response.ok) {
        const errorMessage = responseBody.detail[0].msg;
        console.log(errorMessage);
        return;
      }
      getAllSuppliers();
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <div className="AdminSuppliers">
      <Box>
        <Paper elevation={2}>
          <h3>Suppliers Management (WIP)</h3>
        </Paper>
      </Box>
      <Box
        className="AdminSuppliers__Box"
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
              to={"/admin/supplier"}
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
                  {mockSuppliers ? (
                    mockSuppliers.map((supplier) => (
                      <TableRow
                        key={supplier.id}
                        data-id={supplier.id}
                        data-title={supplier.title}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        hover
                      >
                        <TableCell component="th" scope="row">
                          <Link
                            component={RouterLink}
                            to={"/supplier/" + supplier.id}
                          >
                            {supplier.company_name}
                          </Link>
                        </TableCell>
                        <TableCell align="right">{supplier.email}</TableCell>
                        <TableCell align="right">{supplier.price}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            component={RouterLink}
                            to={"/admin/supplier/" + supplier.id}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            sx={{ marginLeft: 1 }}
                            onClick={handleRemove}
                            disabled={false}
                          >
                            Disable (WIP)
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
                        colSpan={3}
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
