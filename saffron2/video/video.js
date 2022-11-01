import React, { useEffect, useRef } from "react";
import { istyleParser } from "../i";
import styles from './video.module.css';
import c from '../../CustomClass';
import { IoPause, IoPlay, IoVolumeHigh, IoVolumeMute, IoWarning } from "react-icons/io5";

export default function Video(_props) {
    let props = { ..._props };

    //#region video seeking, volume, and other basic controls
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
    const volumeRef = useRef(null);
    const progressTrackRef = useRef(null);
    const [playing, setPlaying] = React.useState(false);
    const [showControls, setShowControls] = React.useState(false);
    const [volume, setStateVolume] = React.useState(1);
    const [muted, setMuted] = React.useState(false);

    const updatePlayerHeadPosition = () => {
        if (!videoRef.current) return;
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

    const updatePlayerVolume = () => {
        setStateVolume(videoRef.current.volume);
    }

    const setPlayerStatePlay = () => {
        videoRef.current.play();
    }

    const setPlayerStatePause = () => {
        videoRef.current.pause();
    }

    const setPlayerStateMute = (isMuted = true) => {
        videoRef.current.muted = isMuted;
        setMuted(isMuted);
    }

    const setProgress = (e) => {
        if (!window.__pointerDown) return;
        const video = videoRef.current;
        const progressBar = progressTrackRef.current;
        const percentage = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.getBoundingClientRect().width;
        video.currentTime = percentage * video.duration;
    }

    const setVolume = (e) => {
        if (!window.__pointerDown) return;
        const video = videoRef.current;
        const volumeBar = volumeRef.current;
        let percentage = (e.clientX - volumeBar.getBoundingClientRect().left) / volumeBar.getBoundingClientRect().width;
        percentage = Math.min(1, Math.max(0, percentage));
        if (percentage > 0.95) percentage = 1;
        video.volume = percentage;
        setPlayerStateMute(false);
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

    //#endregion

    const [error, setError] = React.useState(false);

    let srcList;

    if (props.src) {
        srcList = Array.isArray(props.src) ? props.src : [props.src];
        delete props.src;
    } else if (!error) {
        setError(true);
    }

    const [srcIndex, setSrcIndex] = React.useState(0);
    const [src, setSrc] = React.useState(srcList?.[srcIndex]);

    return (
        <div className={c(styles.wrapper, parentClasses)} style={parentStyle}>
            {error ? (
                <div className={styles.error}>
                    <IoWarning size="2.5em" />
                    <div className={styles.errorInfo}>
                        <span>Error playing video</span>
                        <span>S-41</span>
                    </div>
                </div>
            ) : (
                <>
                    <video
                        {...props}
                        ref={videoRef}
                        className={c(styles.video, videoClasses)}
                        onPlay={updatePlayerStatePlay}
                        onPause={updatePlayerStatePause}
                        onEnded={updatePlayerStateEnd}
                        onVolumeChange={updatePlayerVolume}
                        src={src}
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
                                    {muted ? (
                                        <IoVolumeMute
                                            className={styles.volumeIcon}
                                            onClick={() => {
                                                setPlayerStateMute(false);
                                            }}
                                        />
                                    ) : (
                                        <IoVolumeHigh
                                            className={styles.volumeIcon}
                                            onClick={() => {
                                                setPlayerStateMute(true);
                                            }}
                                        />
                                    )}
                                    <div className={styles.volumeSlider}>
                                        <div className={styles.volumeSliderTrack}
                                            ref={volumeRef}
                                            onMouseDown={(e) => {
                                                window.__pointerDown = true;
                                                setVolume(e);
                                            }}
                                            onMouseMove={setVolume}
                                            onDragStart={(e) => e.preventDefault()}
                                        ></div>
                                        <div className={styles.volumeSliderBar}
                                            style={{ width: muted ? 0 : (volume * 100 + "%") }}
                                            onMouseDown={(e) => {
                                                window.__pointerDown = true;
                                                setVolume(e);
                                            }}
                                            onMouseMove={setVolume}
                                            onDragStart={(e) => e.preventDefault()}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div >
    );
}