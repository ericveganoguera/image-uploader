import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

function Success(props) {
  const url = "https://image-uploader-api.adaptable.app/";
  const imageUrl = url + "files/" + props.fileName;

  const [isCopied, setIsCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(imageUrl);
    setIsCopied(true);
  };

  return (
    <div className="container">
      <FontAwesomeIcon icon={faCircleCheck} className="green-check" />
      <h1 className="title-success">Uploaded Successfully!</h1>
      <img
        src={props.selectedImageUrl}
        alt="Image from DB"
        className="image-from-db"
      />
      <div className="container-link-image-from-db">
        <input
          type="text"
          className="link-image-from-db"
          value={imageUrl}
          readOnly
        />
        <button className="copy-link-image-from-db" onClick={copyLink}>
          {isCopied ? "Copied!" : "Copy link"}
        </button>
      </div>
      <Link
        to="/"
        className="back-button-success"
        onClick={() => {
          props.setSelectedImageUrlCallback(null);
          props.setSelectedImageCallback(null);
          props.setFileNameCallback(null);
        }}
      >
        Back
      </Link>
    </div>
  );
}

export default Success;
