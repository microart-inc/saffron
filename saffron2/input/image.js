import React from "react";
import { IoDocument } from "react-icons/io5";
import styles from './image.module.css';

export default function ImageInput() {

    let [imgBlob, setImgBlob] = React.useState(null);
    let [file, setFile] = React.useState(null);

    let fileInput = React.useRef(null);

    return (
        <div className={styles.wrapper}>
            {imgBlob && (
                <div className={styles.preview}>
                    <img
                        src={imgBlob}
                        className={styles.image}
                    />
                </div>
            )}
            <div className={styles.input}>
                <div className={styles.info}>
                    {file ? file.name : "No file selected"}
                </div>
                <div
                    className={styles.button}
                    onClick={() => fileInput.current.click()}
                >
                    <IoDocument />
                </div>
            </div>
            <input
                type="file"
                ref={fileInput}
                className={styles.fileInput}
                onChange={e => {
                    let file = e.target.files[0];
                    setFile(file);
                    let reader = new FileReader();
                    reader.onload = y => {
                        setImgBlob(y.target.result);
                    }
                    reader.readAsDataURL(file);
                }}
                hidden
            />
        </div>
    )
}