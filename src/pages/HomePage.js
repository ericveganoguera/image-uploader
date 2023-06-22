import { Link, useNavigate } from "react-router-dom";
import mountain from "../assets/montain.png";
import React, { useRef, useState } from "react";

function HomePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const dropFile = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    setSelectedImage(file);
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

  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = () => {
    formRef.current.submit();
    navigate("/uploading");
  };

  return (
    <div className="container">
      <h1 className="title">Upload your image</h1>
      <h3 className="subtitle">File should be Jpeg, Png,...</h3>
      {selectedImage ? (
        <div className="image-selected">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="uploaded-image"
            className="uploaded-image"
          />
        </div>
      ) : (
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
        </div>
      )}
      {selectedImage ? (
        <>
          <form
            action="http://localhost:5005/upload"
            method="POST"
            encType="multipart/form-data"
            ref={formRef}
          >
            <input
              name="file"
              type="file"
              id="upload-button"
              accept="image/jpg,image/png"
              onChange={handleFileChange}
            />
          </form>
          <label className="choose-file" htmlFor="upload-button" style={{bottom:70}}>
            Upload
          </label>
        </>
      ) : (
        <>
          <p className="or">Or </p>
          <form
            action="http://localhost:5005/upload"
            method="POST"
            encType="multipart/form-data"
            ref={formRef}
          >
            <input
              name="file"
              type="file"
              id="upload-button"
              accept="image/jpg,image/png"
              onChange={handleFileChange}
            />
          </form>
          <label className="choose-file" htmlFor="upload-button">
            Choose a file
          </label>
        </>
      )}

      <div id="error">{error}</div>
    </div>
  );
}

export default HomePage;
