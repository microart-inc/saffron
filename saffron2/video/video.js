import React, { useEffect, useRef } from "react";
import { istyleParser } from "../i";
import styles from './video.module.css';
import c from '../../CustomClass';
import { IoPause, IoPlay, IoVolumeHigh } from "react-icons/io5";

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
    const progressBarRef = useRef(null);
    const progressTrackRef = useRef(null);
    const [playing, setPlaying] = React.useState(false);
    const [showControls, setShowControls] = React.useState(false);

    const updatePlayerHeadPosition = () => {
        const video = videoRef.current;
        const progressBar = progressBarRef.current;
        const percentage = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${percentage}%`;
        if (!video.ended) {
            requestAnimationFrame(updatePlayerHeadPosition);
        }
    }

    const updatePlayerStatePlay = () => {
        setPlaying(true);
        requestAnimationFrame(updatePlayerHeadPosition);
    }

    const updatePlayerStatePause = () => {
        setPlaying(false);
        cancelAnimationFrame(updatePlayerHeadPosition);
    }

    const updatePlayerStateEnd = () => {
        setPlaying(false);
        cancelAnimationFrame(updatePlayerHeadPosition);
    }

    const setPlayerStatePlay = () => {
        videoRef.current.play();
    }

    const setPlayerStatePause = () => {
        videoRef.current.pause();
    }

    const setProgress = (e) => {
        if (!window.__pointerDown) return;
        const video = videoRef.current;
        const progressBar = progressTrackRef.current;
        const percentage = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.getBoundingClientRect().width;
        video.currentTime = percentage * video.duration;
    }

    useEffect(() => {
        const setPointerDown = () => {
            window.__pointerDown = true;
        }
        const setPointerUp = () => {
            window.__pointerDown = false;
        }
        window.addEventListener('mousedown', setPointerDown);
        window.addEventListener('mouseup', setPointerUp);

        return () => {
            window.removeEventListener('mousedown', setPointerDown);
            window.removeEventListener('mouseup', setPointerUp);
        }
    }, []);

    return (
        <div className={c(styles.wrapper, parentClasses)} style={parentStyle}>
            <video
                {...props}
                ref={videoRef}
                className={c(styles.video, videoClasses)}
                onPlay={updatePlayerStatePlay}
                onPause={updatePlayerStatePause}
                onEnded={updatePlayerStatePause}
            />
            <div className={styles.controls}>
                <div></div>
                <div className={styles.controlsBottom}>
                    <div className={styles.progressWrapper}
                        onMouseDown={(e) => {
                            window.__pointerDown = true;
                            setProgress(e);
                        }}
                        onMouseMove={setProgress}
                    >
                        <div className={styles.progressTrack}
                            ref={progressTrackRef}
                        ></div>
                        <div className={styles.progressBuffered}></div>
                        <div className={styles.progressBar}
                            ref={progressBarRef}
                        >
                            <div className={styles.progress}></div>
                            <div className={styles.progressThumbWrapper}>
                                <div className={styles.progressThumb}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.controlsBottomButtons}>
                        {playing ? (
                            <IoPause
                                onClick={setPlayerStatePause}
                            />
                        ) : (
                            <IoPlay
                                onClick={setPlayerStatePlay}
                            />
                        )}
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