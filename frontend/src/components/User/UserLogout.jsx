import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import AlertMessage from "../AlertMessage";

export default function UserLogout() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  async function handleLogout() {
    setErrorText(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/logout", {
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

        setIsLoading(false);
        setErrorText(errorMessage);
        return;
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setErrorText("Logout failed.");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleLogout();
    auth.logout();
    navigate("/");
  }, [auth, navigate]);

  return (
    <div className="Logout">
      <h2>Logging Out...</h2>
      <Box>
        {errorText && <AlertMessage type="error" message={errorText} />}
        {isLoading ? <CircularProgress /> : ""}
      </Box>
    </div>
  );
}
