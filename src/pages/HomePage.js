import { Link } from "react-router-dom"
import mountain from "../assets/montain.png"

function HomePage () {
    return (
        <div className="container">
            <h1 className="title">Upload your image</h1>
            <h3 className="subtitle">File should be Jpeg, Png,...</h3>
            <div className="drag-file">
                <img src={mountain} alt="mountain-file" className="image-drop-file" draggable="false"/>
                <p className="text-drop-file">Drag & Drop your image here</p>
            </div>
            <p className="or">Or </p>
            <input type="file" id="upload-button" multiple accept="image/jpg,image/png"/>
            <label className="choose-file" for="upload-button">Choose a file </label>
            <Link to="/success" className="choose-file" style={{border:"none"}}>Upload</Link>
        </div>
    )
}

export default HomePage