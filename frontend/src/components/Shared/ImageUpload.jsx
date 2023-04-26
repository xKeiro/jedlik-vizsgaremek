import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage";
import FileUpload from "react-mui-fileuploader";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function ImageUpload({ endpoint, id }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const [url, setUrl] = useState(
    process.env.REACT_APP_API + `/api/${endpoint}/${id}/Image`
  );

  useEffect(() => {
    setUrl(process.env.REACT_APP_API + `/api/${endpoint}/${id}/Image`);
  }, [id, endpoint]);

  const [filesToUpload, setFilesToUpload] = useState([]);

  const handleFilesChange = (files) => {
    setFilesToUpload([...files]);
  };

  const uploadFiles = async () => {
    setErrorText("");
    setSuccessText("");
    setIsLoading(true);

    let formData = new FormData();
    filesToUpload.forEach((file) => formData.append("image", file));

    const response = await fetch(url, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    const responseBody = await response.json();
    if (!response.ok) {
      const errorMessage = responseBody.title;
      console.log(errorMessage);
      console.log(responseBody);
      setIsLoading(false);
      setErrorText(errorMessage);
      return;
    }
    console.log(responseBody);
    setIsLoading(false);
    setSuccessText(responseBody.message + " Redirecting...");
    setTimeout(() => {
      navigate(0);
    }, 3000);
  };

  return (
    <>
      {successText && <AlertMessage type="success" message={successText} />}
      {errorText && <AlertMessage type="error" message={errorText} />}
      {isLoading ? <CircularProgress /> : ""}
      <FileUpload
        title={"Upload new image"}
        header="Drag to drop"
        leftLabel="or"
        rightLabel="to select a file"
        buttonLabel="click here"
        imageSrc={"/images/placeholder.png"}
        showPlaceholderImage={false}
        multiFile={false}
        disabled={isLoading}
        maxUploadFiles={1}
        acceptedType={"image/*"}
        onFilesChange={handleFilesChange}
        onContextReady={(context) => {}}
        BannerProps={{
          elevation: 0,
          variant: "outlined",
        }}
        ContainerProps={{
          elevation: 0,
          variant: "outlined",
          sx: { p: 1 },
        }}
      />

      <Button variant="contained" sx={{ marginY: 2 }} onClick={uploadFiles}>
        Upload Image
      </Button>
    </>
  );
}
