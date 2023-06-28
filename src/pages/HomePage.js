import { useNavigate } from "react-router-dom";
import mountain from "../assets/montain.png";
import React, { useState } from "react";
import axios from "axios";

function HomePage(props) {
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const dropFile = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    console.log(file.type)
    if (
      file.type !== "image/png" &&
      file.type !== "image¨/jpg" &&
      file.type !== "image/jpeg"
    ) {
      console.log("FORMAT");
      props.setErrorCallback("You must select a valid format image");
    } else if (file.size > 2097152) {
      console.log("SIZE");
      props.setErrorCallback("Image so big");
    } else {
      props.setSelectedImageCallback(file);
      props.setSelectedImageUrlCallback(URL.createObjectURL(file));
      props.setFileNameCallback(file.name);
      console.log("SIZE: ", file.size);
      console.log("GOOD");
    }
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    const relatedTarget = event.relatedTarget;
    if (
      relatedTarget.id !== "mountain" &&
      relatedTarget.id !== "text-drop" &&
      relatedTarget.id !== "drop-file"
    ) {
      setIsDragging(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/uploading");
    axios
      .post(
        process.env.REACT_APP_URL_API,
        { file: props.selectedImage },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        navigate("/success");
      })
      .catch((err) => {
        console.log("Error: ", err.response.data.message);
        const errorDescription = err.response.data.message;
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
            value={props.selectedImage}
            onChange={(e) => {
              props.setSelectedImageUrlCallback(
                URL.createObjectURL(e.target.files[0])
              );
              props.setSelectedImageCallback(e.target.files[0]);
              props.setFileNameCallback(e.target.files[0].name);
            }}
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
