import { Link, useNavigate } from "react-router-dom";

function Uploading() {
  const navigate = useNavigate();

  navigate("/success");

  return (
    <div className="container-uploading">
      <h1 className="title">Uploading...</h1>
      <div className="loading-upload-bar">
        <div className="loading-upload-inside-bar"></div>
      </div>
    </div>
  );
}

export default Uploading;
