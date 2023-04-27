import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import AlertMessage from "../Shared/AlertMessage";

import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function UserLogin() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  async function handleLogin() {
    setErrorText("");
    setIsLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_API + "/api/auth/login",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            identifier: loginUser,
            password: loginPassword,
          }),
        }
      );
      const responseBody = await response.json();

      if (!response.ok) {
        const errorMessage = responseBody.title;
        console.log(errorMessage);

        clearInputs();
        setIsLoading(false);
        setErrorText(errorMessage);
        return;
      }

      clearInputs();
      //setIsLoading(false);
      console.log(responseBody);
      auth.login(responseBody);
      setSuccessText("Successfully logged in, redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.log(err);
      clearInputs();
      setErrorText("Login failed.");
      setIsLoading(false);
    }
  }

  function clearInputs() {
    setLoginUser("");
    setLoginPassword("");
  }

  return (
    <div className="Login">
      <Box>
        <Paper elevation={2}>
          <h2>Login Page</h2>
        </Paper>
      </Box>
      <Box
        className="Login__Form"
        sx={{
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
          <Grid item xs={11} md={5}>
            <Paper elevation={3}>
              {successText && (
                <AlertMessage type="success" message={successText} />
              )}
              {errorText && <AlertMessage type="error" message={errorText} />}
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Grid container spacing={2} padding={2} marginY={2}>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      required
                      label="Username / Email"
                      id="user"
                      name="user"
                      type="text"
                      value={loginUser}
                      onChange={(e) => setLoginUser(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      required
                      label="Password"
                      id="password"
                      name="password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ marginY: "20px", paddingY: "10px" }}
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <span>Don't have an account? </span>
                    <Link component={RouterLink} to={"/registration"}>
                      Register
                    </Link>
                    <span>.</span>
                  </Grid>
                </Grid>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
