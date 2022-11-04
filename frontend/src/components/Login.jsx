import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "./Loader";
import AlertMessage from "./AlertMessage";

import { Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Login() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  function jwtDecode(jwtString) {
    let token = {};
    token.raw = jwtString;
    token.header = JSON.parse(window.atob(jwtString.split(".")[0]));
    token.payload = JSON.parse(window.atob(jwtString.split(".")[1]));
    return token;
  }

  async function handleLogin() {
    setErrorText(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          identifier: loginUser,
          password: loginPassword,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        const errorMsg = responseData.detail[0].msg;
        console.log(errorMsg);

        clearInputs();
        setIsLoading(false);
        setErrorText(errorMsg);
        return;
      }

      const decodedToken = jwtDecode(responseData);
      console.log(decodedToken);

      clearInputs();
      setIsLoading(false);

      // work in progress
      // auth.login(decodedToken.uid, decodedToken.username, responseData);
      // navigate("/");
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
      <div>
        <h2>Login page</h2>
      </div>
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
          <Grid item xs={11} md={4}>
            {errorText && <AlertMessage type="error" message={errorText} />}
            {isLoading ? (
              <Loader />
            ) : (
              <Grid container spacing={1}>
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
                  ></TextField>
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
                  ></TextField>
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
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
