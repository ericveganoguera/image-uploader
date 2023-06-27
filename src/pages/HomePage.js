import { Link, useNavigate } from "react-router-dom";
import mountain from "../assets/montain.png";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Uploading from "./Uploading";

function HomePage(props) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dropFile = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    props.setSelectedImageCallback(URL.createObjectURL(file));
    props.setFileNameCallback(file.name);
    console.log("SELECTED: ", props.selectedImage);
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
    axios
      .post("https://image-uploader-api.adaptable.app/upload", {
        file: props.selectedImage,
      })
      .then(() => {
        navigate("/uploading");
        setTimeout(() => {
          navigate("/success");
        }, 2000);
      })
      .catch((err) => {
        console.log("Error: ", err);
        const errorDescription = err.response
        setError(errorDescription);
      });
  };

  return (
    <div className="container">
      <h1 className="title">Upload your image</h1>
      <h3 className="subtitle">File should be Jpeg, Png,...</h3>
      {props.selectedImage ? (
        /* Si hay imagen seleccionada */
        <div className="image-selected">
          <img
            src={props.selectedImage}
            alt="uploaded-image"
            className="uploaded-image"
          />

          <input
            name="file"
            type="submit"
            id="upload-button"
            accept="image/jpg,image/png"
            onClick={handleSubmit}
          />

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
            accept="image/jpg,image/png"
            value={props.selectedImage}
            onChange={(e) => {
              props.setSelectedImageCallback(
                URL.createObjectURL(e.target.files[0])
              );
              props.setFileNameCallback(
                URL.createObjectURL(e.target.files[0].name)
              );
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

      <div id="error">{error}</div>
    </div>
  );
}

export default HomePage;
