import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage.js";
import Uploading from "./pages/Uploading.js";
import Success from "./pages/Success";
import ErrorPage from "./pages/ErrorPage.js";
import React, { useState } from "react";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              selectedImageUrl={selectedImageUrl}
              setSelectedImageUrlCallback={setSelectedImageUrl}
              selectedImage={selectedImage}
              setSelectedImageCallback={setSelectedImage}
              fileName={fileName}
              setFileNameCallback={setFileName}
              error={error}
              setErrorCallback={setError}
            />
          }
        ></Route>
        <Route path="/uploading" element={<Uploading />}></Route>
        <Route
          path="/success"
          element={
            <Success
              selectedImageUrl={selectedImageUrl}
              setSelectedImageUrlCallback={setSelectedImageUrl}
              selectedImage={selectedImage}
              setSelectedImageCallback={setSelectedImage}
              fileName={fileName}
              setFileNameCallback={setFileName}
            />
          }
        ></Route>
        <Route
          path="/error"
          element={
            <ErrorPage
              error={error}
              setErrorCallback={setError}
              selectedImageUrl={selectedImageUrl}
              setSelectedImageUrlCallback={setSelectedImageUrl}
              selectedImage={selectedImage}
              setSelectedImageCallback={setSelectedImage}
              fileName={fileName}
              setFileNameCallback={setFileName}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
