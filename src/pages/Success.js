import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import imageFromDb from "../assets/js.png";
import { useState } from "react";

function Success() {

  const imageUrl = "http://localhost:5005/files/FotoPerfil.jpg"

  const [isCopied, setIsCopied] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(imageUrl);
    setIsCopied(true)
  }

  return (
    <div className="container">
      <FontAwesomeIcon icon={faCircleCheck} className="green-check" />
      <h1 className="title-success">Uploaded Successfully!</h1>
      <img src={imageUrl} alt="Image from DB" className="image-from-db" />
      <div className="container-link-image-from-db">
        <input type="text" className="link-image-from-db" value={imageUrl} readOnly/>
        <button className="copy-link-image-from-db" onClick={copyLink}>{isCopied ? "Copied!" : "Copy link"}</button>
      </div>
    </div>
  );
}

export default Success;
