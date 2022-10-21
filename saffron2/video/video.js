import React, { useRef } from "react";
import { istyleParser } from "../i";
import styles from './video.module.css';
import c from '../../CustomClass';
import { IoPlay, IoVolumeHigh } from "react-icons/io5";

export default function Video(_props) {
    let props = { ..._props };

    let parentStyle = {};
    let parentClasses = [];

    let videoClasses = [];

    if (props.className) {
        parentClasses.push(props.classname.split(" "));
        delete props.classname;
    }

    if (props.videoClassName) {
        //props.className = props.videoClassName;
        videoClasses.push(props.videoClassName.split(" "));
        delete props.videoClassName;
    }

    props = istyleParser(props);

    if (props.style) {
        parentStyle = props.style;
        delete props.style;
    }

    if (props.videoStyle) {
        props.style = props.videoStyle;
        delete props.videoStyle;
    }


    let canShowControls = false;

    if (props.controls) {
        canShowControls = props.controls;
        delete props.controls;
    }

    const videoRef = useRef(null);
    const [playing, setPlaying] = React.useState(false);
    const [showControls, setShowControls] = React.useState(false);

    console.log(props);

    return (
        <div className={c(styles.wrapper, parentClasses)} style={parentStyle}>
            <video
                {...props}
                ref={videoRef}
                className={c(styles.video, videoClasses)}
            />
            <div className={styles.controls}>
                <div></div>
                <div className={styles.controlsBottom}>
                    <div className={styles.progressWrapper}>
                        <div className={styles.progressTrack}></div>
                        <div className={styles.progressBuffered}></div>
                        <div className={styles.progressBar} style={{ width: "50%" }}>
                            <div className={styles.progress}></div>
                            <div className={styles.progressThumbWrapper}>
                                <div className={styles.progressThumb}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.controlsBottomButtons}>
                        <IoPlay />
                        <div className={styles.volume}>
                            <IoVolumeHigh />
                            <div className={styles.volumeSlider}>
                                <div className={styles.volumeSliderTrack}></div>
                                <div className={styles.volumeSliderBar} style={{ width: "50%" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}