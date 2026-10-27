import { useNavigate } from "react-router-dom";
import mountain from "../assets/montain.png";
import React, { useState } from "react";
import axios from "axios";

const VALID_TYPES = ["image/png", "image/jpeg"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

function HomePage(props) {
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  // Same checks for drag & drop and for the file picker (the API validates again)
  const selectFile = (file) => {
    if (!file) return;
    if (!VALID_TYPES.includes(file.type)) {
      props.setErrorCallback("You must select a valid format image (PNG or JPEG).");
    } else if (file.size > MAX_FILE_SIZE) {
      props.setErrorCallback("The image must be 2 MB or smaller.");
    } else {
      props.setErrorCallback("");
      props.setSelectedImageCallback(file);
      props.setSelectedImageUrlCallback(URL.createObjectURL(file));
    }
  };

  const dropFile = (event) => {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files[0]);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    const relatedTarget = event.relatedTarget;
    if (
      !relatedTarget ||
      (relatedTarget.id !== "mountain" &&
      relatedTarget.id !== "text-drop" &&
      relatedTarget.id !== "drop-file")
    ) {
      setIsDragging(false);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/uploading");
  
    const formData = new FormData();
    formData.append("file", props.selectedImage);
  
    axios
      .post(process.env.REACT_APP_URL_API, formData) // axios sets the multipart boundary
      .then((response) => {
        // The API stores the image with a unique name: use it for the share link
        props.setFileNameCallback(response.data.filename);
        navigate("/success");
      })
      .catch((err) => {
        const errorDescription =
          err.response?.data?.message ||
          "Could not connect to the server. Please try again.";
        props.setErrorCallback(errorDescription);
        navigate("/error");
      });
  };

  return (
    <div className="container">
      <h1 className="title">Upload your image</h1>
      <h3 className="subtitle">File should be Jpeg or Png and maximum 2MB</h3>
      {props.selectedImageUrl ? (
        /* Si hay imagen seleccionada */
        <div className="image-selected">
          <img
            src={props.selectedImageUrl}
            alt="uploaded-image"
            className="uploaded-image"
          />
          <input type="submit" id="upload-button" onClick={handleSubmit} />
          <label
            className="choose-file"
            htmlFor="upload-button"
            style={{ bottom: 70 }}
          >
            Upload
          </label>
        </div>
      ) : (
        /* Si no hay imagen seleccionada */
        <div
          id="drop-file"
          className={`drop-file ${isDragging ? "active" : ""}`}
          onDrop={dropFile}
          onDragOver={(event) => event.preventDefault()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <img
            src={mountain}
            id="mountain"
            alt="mountain-file"
            className="image-drop-file"
            draggable="false"
          />
          <p className="text-drop-file" id="text-drop">
            Drag & Drop your image here
          </p>
          <p className="or" style={{ bottom: -35 }}>
            Or
          </p>
          <input
            name="file"
            type="file"
            id="upload-button-2"
            accept="image/jpeg,image/png"
            onChange={(e) => selectFile(e.target.files[0])}
          />
          <label
            className="choose-file"
            htmlFor="upload-button-2"
            style={{ bottom: -100 }}
          >
            Choose a file
          </label>
        </div>
      )}

      <div id="error">{props.error && props.error}</div>
    </div>
  );
}

export default HomePage;
