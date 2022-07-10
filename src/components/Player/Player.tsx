import styles from './Player.module.css'
import { ensureAnimation, timeFormat } from "./utils";

import PlayIcon from "./assets/icons/play.svg";
import PauseIcon from "./assets/icons/pause.svg";
import OvalLoading from "./assets/animations/oval.svg";

import { PlayerProps } from "./interfaces";
import { useEffect, useRef, useState } from "react";

import HlsPlay from './hls';
import Controls from './Controls';
import ControlsMobile from './ControlsMobile';
import GraphConnect from './GraphConnect';

export default function Player({ source, type, poster }: PlayerProps) {

    const [videoPlay, setVideoPlay] = useState<boolean>(false);
    const [videoPaused, setVideoPaused] = useState<boolean>(false);
    const [animating, setAnimating] = useState<boolean>(false);
    const [canPlay, setCanPlay] = useState<boolean>(false);
    const [waiting, setWaiting] = useState<boolean>(true);
    const [bufferingProgress, setBufferingProgress] = useState<number>(0);

    const playerRef = useRef<HTMLDivElement>();
    const videoRef = useRef<HTMLVideoElement>();
    const videoPlayRef = useRef<HTMLDivElement>();

    // Animate Play / Pause
    useEffect(() => {
        ensureAnimation(async () => {
            setAnimating(true);
            videoPlayRef.current.classList.add(styles.animate);
        }, 1000)
            .then(() => {
                videoPlayRef.current.classList.remove(styles.animate);
                setAnimating(false);
            })
    }, [videoPlay])

    useEffect(() => {
        // remove the default buttons
        videoRef.current.removeAttribute('controls');

        // add paused state
        playerRef.current.classList.add(styles.paused);

    }, [])

    useEffect(() => {

        if (videoRef.current) {

            // load hls
            if (type == "hls") {
                HlsPlay({ source, videoRef });
            } else {
                videoRef.current.src = source;
            }
        }
    }, [source, type, videoRef])

    const play = () => {
        videoRef.current.play();
    }
    const pause = () => {
        videoRef.current.pause();
    }

    const togglePlay = () => {
        videoPlay ? pause() : play();
    }

    const reportPlay = () => {
        setVideoPlay(true);
        setVideoPaused(false);
        playerRef.current.classList.remove(styles.paused)
        playerRef.current.classList.add(styles.playing)
    }

    const reportPause = () => {
        setVideoPlay(false);
        setVideoPaused(true);
        playerRef.current.classList.remove(styles.playing)
        playerRef.current.classList.add(styles.paused)
    }

    const reportWaiting = () => {
        setWaiting(true);
        setCanPlay(false);
    }

    const reportCanPlay = () => {
        setWaiting(false);
        setCanPlay(true);
    }

    const enableFullScreen = () => {
        playerRef.current.classList.add(styles.fullScreen);
    }

    const disableFullScreen = () => {
        playerRef.current.classList.remove(styles.fullScreen);
    }

    function reportBuffer(e) {
        // Update buffering bar

        if (isNaN(e.target.duration) || e.target.buffered.length == 0) return;
        const videoBuffered = 100 / (e.target.duration / e.target.buffered.end(0));
        setBufferingProgress(videoBuffered);
    }

    return (
        <>
            <div id="seaPlayer" className={styles.player} ref={playerRef}>
                <video
                    id="video"
                    className={styles.video}
                    ref={videoRef}
                    poster={poster}
                    autoPlay={false}
                    onCanPlay={reportCanPlay}
                    onWaiting={reportWaiting}
                    onProgress={reportBuffer}
                    onPlay={reportPlay}
                    onPause={reportPause}
                />
                <div id="video-gradient" className={styles.gradient} />
                <div id="video-play-toggle" className={styles.videoPlayToggle}
                    onClick={togglePlay} style={{
                        opacity: (canPlay && (!videoPlay || animating)) ? 1 : 0
                    }}>
                    <div id="video-play"
                        className={styles.videoPlay}
                        ref={videoPlayRef}
                        onClick={togglePlay}

                    >
                        {
                            (videoPaused && animating)
                                ? <PauseIcon style={{
                                    width: "50%"
                                }} fill="#e6e6e6" />
                                : <PlayIcon style={{
                                    width: "50%",
                                    marginLeft: "10%"
                                }} fill="#e6e6e6" />
                        }
                    </div>
                </div>

                <div id="video-loading" className={styles.videoLoading} style={{
                    display: waiting ? 'flex' : 'none'
                }}>
                    <OvalLoading width={100} height={100} />
                    <div id="loaded-title" className={styles.loadedTitle}>{bufferingProgress.toFixed(1)}%</div>
                </div>

                <div className={styles.controls}>
                    <Controls
                        videoRef={videoRef}
                        onFullScreen={(status) => status ? enableFullScreen() : disableFullScreen()}
                    />
                </div>

                <div className={styles.controlsMobile}>
                    <ControlsMobile
                        videoRef={videoRef}
                        onFullScreen={(status) => status ? enableFullScreen() : disableFullScreen()}
                    />
                </div>


                <GraphConnect />

            </div>
        </>
    )
}