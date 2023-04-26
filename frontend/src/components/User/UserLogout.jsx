import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import AlertMessage from "../Shared/AlertMessage";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

export default function UserLogout() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  async function handleLogout() {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = response.statusText;
        console.log(errorMessage);

        setIsLoading(false);
        setErrorText(errorMessage);
        return;
      }
      //setIsLoading(false);
      setSuccessText("Successfully logged out, redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.log(err);
      setErrorText("Logout failed.");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    auth.logout();
    handleLogout();
  }, []);

  return (
    <div className="Logout">
      <Box>
        <Paper elevation={2}>
          <h2>Logging out</h2>
        </Paper>
      </Box>

      <Box
        className="Logout__Box"
        sx={{
          margin: "20px",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Grid item md={5} xs={11}>
            <Box>
              <Paper elevation={3}>
                {successText && (
                  <AlertMessage type="success" message={successText} />
                )}
                {errorText && <AlertMessage type="error" message={errorText} />}
                {isLoading ? <CircularProgress /> : ""}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
