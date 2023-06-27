import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage.js";
import Uploading from "./pages/Uploading.js";
import Success from "./pages/Success";
import React, { useState } from "react";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              selectedImage={selectedImage}
              setSelectedImageCallback={setSelectedImage}
              fileName={fileName}
              setFileNameCallback={setFileName}
            />
          }
        ></Route>
        <Route path="/uploading" element={<Uploading />}></Route>
        <Route
          path="/success"
          element={
            <Success
              selectedImage={selectedImage}
              setSelectedImageCallback={setSelectedImage}
              fileName={fileName}
              setFileNameCallback={setFileName}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
