import React, { useRef } from "react";
import { IoDocument, IoDocumentText, IoFilm, IoImage } from "react-icons/io5";
import styles from './image.module.css';

export default function ImageInput({ value, onChange }) {

    let [imgBlob, setImgBlob] = React.useState(null);
    let [file, setFile] = React.useState(value);

    let fileInput = React.useRef(null);

    let thumb = null;

    if (imgBlob) {
        if (!imgBlob.startsWith('data')) {
            let htype = imgBlob.split('/')[0];
            switch (htype) {
                case 'image':
                    thumb = <IoImage className={styles.icon} fill="blue" />
                    break;
                case 'video':
                    thumb = <IoFilm className={styles.icon} fill="red" />
                    break;
                case 'text':
                    thumb = <IoDocumentText className={styles.icon} fill="green" />
                    break;
                default:
                    thumb = <IoDocument className={styles.icon} fill="rgb(0,140,230)" />
                    break;
            }
        } else {
            thumb = <img
                src={imgBlob}
                alt="Preview"
                className={styles.image}
                draggable={false}
                onError={e => {
                    e.target.src = 'https://via.placeholder.com/150';
                }}
            />
        }
    }

    let loadFile = (file) => {
        if (file) {
            setFile(file);
            onChange?.(file);
            if (file.type.startsWith("image/")) {
                let reader = new FileReader();
                reader.onload = e => {
                    setImgBlob(e.target.result);
                }
                reader.readAsDataURL(file);
            } else {
                setImgBlob(file.type ? file.type : 'application/octet-stream');
            }
        } else {
            setFile(null);
            setImgBlob(null);
        }
    }

    return (
        <div
            className={styles.wrapper}
            onDrop={e => {
                if (e.dataTransfer.files.length > 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    loadFile(e.dataTransfer.files[0]);
                }
            }}
            onDragOver={e => {
                if (e.dataTransfer.types.includes('Files')) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }}
            onDragEnter={e => {
                if (e.dataTransfer.types.includes('Files')) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }}
        >
            {thumb && (
                <div className={styles.preview}>
                    {thumb}
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
                    loadFile(e.target.files[0]);
                }}
                hidden
            />
        </div>
    )
}