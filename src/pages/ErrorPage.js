import { useEffect } from "react";
import { Link } from "react-router-dom";

function ErrorPage(props) {
  useEffect(() => {
    props.setSelectedImageUrlCallback(null);
    props.setSelectedImageCallback(null);
    props.setFileNameCallback(null);
  }, []);
  return (
    <div className="container-error">
      <h1 className="title-error">{props.error ? props.error : "Error"}</h1>
      <Link to="/" className="back-button">
        Back
      </Link>
    </div>
  );
}

export default ErrorPage;
