import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Loader from "./Loader";
import AlertMessage from "./AlertMessage";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { Link } from "@mui/material";

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
      clearInputs();
      setErrorText("Login failed");
      console.log(err);
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
      {errorText && <AlertMessage type="error" message={errorText} />}
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          className="Login__Form"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <FormControl sx={{ paddingY: "10px" }}>
            <InputLabel htmlFor="user">Email or Username</InputLabel>
            <Input
              id="user"
              type="text"
              aria-describedby="Enter email"
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
            />
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ marginY: "20px" }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              aria-describedby="Enter password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </FormControl>

          <Button
            variant="contained"
            sx={{ margin: "20px", padding: "10px" }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Link component={RouterLink} to={"/registration"}>
            Registration
          </Link>
        </Box>
      )}
    </div>
  );
}
