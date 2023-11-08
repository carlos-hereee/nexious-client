import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "@context/app/AppContext";

// TODO: UPload files
// type FileEventTarget = EventTarget & { files: FileList };
const UploadFile = () => {
  const { uploadImage, getFiles } = useContext(AppContext);
  const imageUpLoaderRef = useRef(null);
  const imageRef = useRef(null);

  const [currentImage, setCurrentImage] = useState();
  const [previewImage, setPreviewImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [imageInfos, setImageInfos] = useState([]);

  const imageClick = () => imageUpLoaderRef.current.click();
  const selectImage = (event) => {
    const selectedFiles = event.target.files;
    setCurrentImage(selectedFiles?.[0]);
    setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
    setProgress(0);
  };
  const upload = () => {
    // todo send file to server
    setProgress(0);
    if (!currentImage) return;
    uploadImage(currentImage, (event) => {
      setProgress(Math.round(100 * event.loaded) / event.total);
    });
  };
  return (
    <div className="container">
      <input
        type="file"
        onChange={selectImage}
        accept="image/*"
        ref={imageUpLoaderRef}
        hidden
      />
      <img
        className="hero preview-hero thumbnail"
        src={previewImage}
        ref={imageRef}
        alt="image-upload-preview"
        onClick={imageClick}
      />
      {message && <p className="error-message">{message}</p>}
      <button type="button" className="btn-main" disabled={!currentImage} onClick={upload}>
        Upload
      </button>

      {currentImage && progress > 0 && (
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: progress + "%" }}
        >
          {progress}%
        </div>
      )}

      {imageInfos.length > 0 && (
        <div>
          <h3 className="heading">List of images</h3>
          <ul>
            {imageInfos.map((img, idx) => (
              <li className="list-group-item" key={idx}>
                <p>
                  <a href={img.url}>{img.name}</a>
                </p>
                <img src={img.url} alt={img.name} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
