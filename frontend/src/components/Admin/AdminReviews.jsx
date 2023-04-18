import React from "react";
//import { useEffect, useState } from "react";

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

export default function AdminReviews() {
  //const [reviews, setReviews] = useState(null);

  const mockReviews = [
    {
      id: 1,
      productName: "Mock Product",
      text: "Mock review 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a hendrerit justo, et auctor neque. Sed arcu ipsum, ullamcorper in quam at, aliquam pellentesque magna. Nam urna eros, laoreet ac libero nec, feugiat vehicula eros. Ut purus arcu, vestibulum a facilisis ac, ullamcorper non enim. Vivamus rutrum, felis sed blandit pharetra, nunc nulla tristique felis, vitae dapibus dui tortor sed nisi. Nam nec gravida mi. Etiam aliquet nec turpis vitae accumsan. Nunc sollicitudin elit id ipsum varius tincidunt.",
      score: 5,
      username: "Usernam A",
    },
    {
      id: 2,
      productName: "Mock Product",
      text: "Mock review 2: Quisque semper vel sem nec porttitor. Donec commodo orci quam. Nunc velit elit, dapibus convallis dictum eget, tincidunt vitae odio. Phasellus ut erat ut velit varius ornare a et lacus. In rutrum viverra nibh nec finibus. Sed vehicula interdum nulla sit amet maximus. Ut non tempor nisl, ac mollis erat. Suspendisse sit amet ipsum diam. Sed nulla leo, rutrum non neque sed, commodo consectetur ipsum.",
      score: 3,
      username: "Username B",
    },
    {
      id: 3,
      productName: "Mock Product",
      text: "Mock review 3: Nullam vel eleifend odio. Curabitur quis dapibus justo. Nullam nec tortor et neque pellentesque egestas. Aenean convallis leo in ante condimentum ornare nec et metus. Fusce egestas dolor vitae feugiat ullamcorper. Proin convallis velit in euismod venenatis. In blandit aliquam tellus vel varius. In convallis, sapien a cursus tincidunt, dolor libero fermentum mi, in posuere tortor tellus non sem. Quisque nec finibus arcu. Morbi at orci semper, egestas mauris ac, ullamcorper arcu. Aenean et nibh eleifend, condimentum magna at, elementum tortor. Sed interdum posuere diam. Mauris scelerisque neque risus. Integer dolor nulla, rhoncus in euismod sed, iaculis et ipsum. Nunc in nisi vel nunc eleifend porta.",
      score: 2,
      username: "Username C",
    },
  ];
  return (
    <div className="AdminReviews">
      <Box>
        <Paper elevation={2}>
          <h3>Reviews Management (WIP)</h3>
        </Paper>
      </Box>
      <Box
        className="AdminReviews__Box"
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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 600 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Review</TableCell>
                    <TableCell align="right">Score</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockReviews ? (
                    mockReviews.map((review) => (
                      <TableRow
                        key={review.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        hover
                      >
                        <TableCell component="th" scope="row">
                          {review.productName}
                        </TableCell>
                        <TableCell align="right">{review.text}</TableCell>
                        <TableCell align="right">{review.score} ☆</TableCell>
                        <TableCell align="right">
                          <Button variant="outlined">Delete (WIP)</Button>
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
