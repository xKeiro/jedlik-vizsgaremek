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

export default function AdminCategories() {
  const [categories, setCategories] = useState(null);

  async function getAllCategories() {
    try {
      const response = await fetch(
        process.env.REACT_APP_API + "/api/categories",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.title;
        console.log(errorMessage);
        return;
      }
      setCategories(responseBody);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="AdminCategories">
      <Box>
        <Paper elevation={2}>
          <h3>Categories Management</h3>
        </Paper>
      </Box>
      <Box
        className="AdminCategories__Box"
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
              to={"/admin/category"}
            >
              Add new
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <TableContainer component={Paper}>
              <Table aria-label="table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories ? (
                    categories.map((category) => (
                      <TableRow
                        key={category.id}
                        data-id={category.id}
                        data-title={category.title}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        hover
                      >
                        <TableCell component="th" scope="row">
                          <Link
                            component={RouterLink}
                            to={"/category/" + category.id}
                          >
                            {category.title}
                          </Link>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            component={RouterLink}
                            to={"/admin/category/" + category.id}
                            disabled={false}
                          >
                            Edit
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
                        colSpan={2}
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
