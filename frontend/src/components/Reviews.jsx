import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import CircularProgress from "@mui/material/CircularProgress";

export default function Reviews({ productId }) {
  //const [reviews, setReviews] = useState(null);

  const mockReviews = [
    {
      id: 1,
      text: "Mock review 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a hendrerit justo, et auctor neque. Sed arcu ipsum, ullamcorper in quam at, aliquam pellentesque magna. Nam urna eros, laoreet ac libero nec, feugiat vehicula eros. Ut purus arcu, vestibulum a facilisis ac, ullamcorper non enim. Vivamus rutrum, felis sed blandit pharetra, nunc nulla tristique felis, vitae dapibus dui tortor sed nisi. Nam nec gravida mi. Etiam aliquet nec turpis vitae accumsan. Nunc sollicitudin elit id ipsum varius tincidunt.",
      score: 5,
      username: "Usernam A",
    },
    {
      id: 2,
      text: "Mock review 2: Quisque semper vel sem nec porttitor. Donec commodo orci quam. Nunc velit elit, dapibus convallis dictum eget, tincidunt vitae odio. Phasellus ut erat ut velit varius ornare a et lacus. In rutrum viverra nibh nec finibus. Sed vehicula interdum nulla sit amet maximus. Ut non tempor nisl, ac mollis erat. Suspendisse sit amet ipsum diam. Sed nulla leo, rutrum non neque sed, commodo consectetur ipsum.",
      score: 3,
      username: "Username B",
    },
    {
      id: 3,
      text: "Mock review 3: Nullam vel eleifend odio. Curabitur quis dapibus justo. Nullam nec tortor et neque pellentesque egestas. Aenean convallis leo in ante condimentum ornare nec et metus. Fusce egestas dolor vitae feugiat ullamcorper. Proin convallis velit in euismod venenatis. In blandit aliquam tellus vel varius. In convallis, sapien a cursus tincidunt, dolor libero fermentum mi, in posuere tortor tellus non sem. Quisque nec finibus arcu. Morbi at orci semper, egestas mauris ac, ullamcorper arcu. Aenean et nibh eleifend, condimentum magna at, elementum tortor. Sed interdum posuere diam. Mauris scelerisque neque risus. Integer dolor nulla, rhoncus in euismod sed, iaculis et ipsum. Nunc in nisi vel nunc eleifend porta.",
      score: 2,
      username: "Username C",
    },
  ];
  return (
    <>
      <div className="Product">
        <Box
          className="Reviews__Box"
          sx={{
            margin: "20px",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <Box>
            <Paper elevation={3}>
              <h3>Reviews (WIP)</h3>
            </Paper>
            <Typography variant="text" color="text.primary">
              Average Rating:{" "}
              {mockReviews
                ? (
                    mockReviews.reduce((acc, curr) => acc + curr.score, 0) /
                    mockReviews.length
                  ).toFixed(2)
                : "..."}{" "}
              ☆
            </Typography>
          </Box>
          <Grid
            container
            direction="row-reverse"
            justifyContent="center"
            spacing={2}
            sx={{ marginBottom: 3 }}
          >
            {mockReviews ? (
              mockReviews.map((review) => (
                <Grid item key={review.id} xs={12} md={12}>
                  <Card key={review.id}>
                    <Paper elevation={3}>
                      <CardContent>
                        <Box width={100}>
                          <Paper elevation={3}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {review.score} ☆
                            </Typography>
                          </Paper>
                        </Box>
                        <Typography gutterBottom variant="text" component="div">
                          {review.text}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          align="right"
                        >
                          {review.username}
                        </Typography>
                      </CardContent>
                    </Paper>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12} md={12}>
                <CircularProgress />
              </Grid>
            )}
          </Grid>
        </Box>
      </div>
    </>
  );
}
