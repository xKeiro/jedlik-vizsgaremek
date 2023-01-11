import React from "react";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Logout() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    auth.logout();
    navigate("/");
  }, [auth, navigate]);

  return <div>Logging Out...</div>;
}
