import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import imageFromDb from "../assets/js.png";

function Success() {
  return (
    <div className="container">
      <FontAwesomeIcon icon={faCircleCheck} className="green-check" />
      <h1 className="title-success">Uploaded Successfully!</h1>
      <img src={imageFromDb} alt="Image from DB" className="image-from-db" />
      <div className="container-link-image-from-db">
        <input type="text" className="link-image-from-db" />
        <button className="copy-link-image-from-db">Copy link</button>
      </div>
    </div>
  );
}

export default Success;
