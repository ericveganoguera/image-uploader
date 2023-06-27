import { Link, useNavigate } from "react-router-dom";

function Uploading() {
  return (
    <div className="container-uploading">
      <h1 className="title-uploading">Uploading...</h1>
      <div className="loading-upload-bar">
        <div className="loading-upload-inside-bar"></div>
      </div>
    </div>
  );
}

export default Uploading;
