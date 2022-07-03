import styles from './Player.module.css'
import { ensureAnimation, timeFormat } from "./utils";

import PlayIcon from "./assets/icons/play.svg";
import SoundIcon from "./assets/icons/sound.svg";
import MuteIcon from "./assets/icons/mute.svg";
import PauseIcon from "./assets/icons/pause.svg";
import SettingsIcon from "./assets/icons/settings.svg";
import SeekIcon from "./assets/icons/seek.svg";
import ExpandIcon from "./assets/icons/expand.svg";
import ShrinkIcon from "./assets/icons/shrink.svg";
import OvalLoading from "./assets/animations/oval.svg";

import { PlayerProps } from "./interface";
import { useEffect, useRef, useState } from "react";

import ProgressBar from "./ProgressBar";
import HlsPlay from './hls';

export default function Player({ source, type, poster }: PlayerProps) {

    const [volume, setVolume] = useState<number>(100);
    const [volPressing, setVolPressing] = useState<boolean>(false);
    const [videoPlay, setVideoPlay] = useState<boolean>(false);
    const [muted, setMuted] = useState<boolean>(false);
    const [videoPaused, setVideoPaused] = useState<boolean>(false);
    const [fullScreen, setFullScreen] = useState<boolean>(false);
    const [animating, setAnimating] = useState<boolean>(false);
    const [timeCurrent, setTimeCurrent] = useState<string>('0:00');
    const [timeDuration, setTimeDuration] = useState<string>('0:00');
    const [canPlay, setCanPlay] = useState<boolean>(false);
    const [waiting, setWaiting] = useState<boolean>(true);
    const [bufferingProgress, setBufferingProgress] = useState<number>(0);


    const playerRef = useRef<HTMLDivElement>();
    const videoRef = useRef<HTMLVideoElement>();
    const videoPlayRef = useRef<HTMLDivElement>();

    useEffect(() => {
        fullScreen
            ? playerRef.current.classList.add(styles.fullScreen)
            : playerRef.current.classList.remove(styles.fullScreen)
    }, [fullScreen])

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

    useEffect(() => {
        videoRef.current.volume = volume / 100;
    }, [volume])

    useEffect(() => {
        videoRef.current.muted = muted;
    }, [muted])

    const play = () => {
        setVideoPlay(true);
        setVideoPaused(false);
        playerRef.current.classList.remove(styles.paused);
        videoRef.current.play();
    }
    const pause = () => {
        setVideoPlay(false);
        setVideoPaused(true);
        playerRef.current.classList.add(styles.paused);
        videoRef.current.pause();
    }

    const togglePlay = () => {
        videoPlay ? pause() : play();
    }

    const toggleMute = () => setMuted(!muted)

    const rangeVolume = (e) => {
        const vol = e.target.value;
        if (volume == vol) return
        setVolume(vol);
        vol == 0 ? setMuted(true) : setMuted(false);
        e.target.style.background = 'linear-gradient(to right, #fff 0%, #fff ' + vol + '%, rgba(255,255,255,.2) ' + vol + '%, rgba(255,255,255,.2) ' + (100 - vol) + '%)'
    }

    const updateTime = (e) => {
        setTimeCurrent(timeFormat(e.target.currentTime));
        setTimeDuration(timeFormat(e.target.duration));
    }


    const reportWaiting = () => {
        setWaiting(true);
        setCanPlay(false);
    }

    const reportCanPlay = () => {
        setWaiting(false);
        setCanPlay(true);
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
                    onTimeUpdate={updateTime}
                    onDurationChange={updateTime}
                    onCanPlay={reportCanPlay}
                    onWaiting={reportWaiting}
                    onProgress={reportBuffer}
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

                <div id="controls" className={styles.controls}>
                    <ProgressBar videoRef={videoRef} />
                    <div id="buttons" className={styles.buttons}>
                        <div className={styles.buttonsLeft}>
                            <button id="play-button" className={styles.button} style={{
                                display: videoPlay ? "none" : "block"
                            }} onClick={play}>
                                <PlayIcon className={styles.buttonIcon} />
                            </button>
                            <button id="pause-button" className={styles.button} style={{
                                display: videoPlay ? "block" : "none"
                            }} onClick={pause}>
                                <PauseIcon className={styles.buttonIcon} />
                            </button>
                            <div id="video-time-status" className="videoTimeStatus">
                                <span className="current">{timeCurrent}</span>
                                / <span className="end">{timeDuration}</span>
                            </div>
                            <div className={styles.videoVolume}>
                                <button id="button-sound" className={styles.sound} style={{
                                    display: muted ? "none" : "block"
                                }} onClick={toggleMute}>
                                    <SoundIcon className={styles.buttonIcon} />
                                </button>
                                <button id="button-mute" className={styles.mute} onClick={toggleMute} style={{
                                    display: muted ? "block" : "none"
                                }}>
                                    <MuteIcon className={styles.buttonIcon} />
                                </button>
                                <div className={styles.rangeVolumeContainer} style={{
                                }}>
                                    <input
                                        type="range"
                                        min={0}
                                        step={10}
                                        max={100}
                                        value={volume}
                                        id="range-volume"
                                        className={styles.rangeVolume}
                                        onChange={rangeVolume}
                                        onMouseMove={(e) => volPressing && rangeVolume(e)}
                                        onMouseDown={() => setVolPressing(true)}
                                        onMouseUp={() => setVolPressing(false)}
                                    />
                                    <div className={styles.rangeVolumeThumb} style={{
                                        left: `${volume * .8}%`,
                                    }} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.buttonsRight}>
                            <button id="settings">
                                <div id="resolutions" className={styles.resolutions}>
                                    <ul></ul>
                                </div>
                                <SettingsIcon className={styles.buttonIcon} />
                            </button>
                            <button className="seek-slides" id="seek-slides">
                                <SeekIcon className={styles.buttonIcon} />
                            </button>
                            <button id="full-screen" onClick={() => setFullScreen(!fullScreen)}>
                                {
                                    fullScreen
                                        ? <ShrinkIcon className={styles.buttonIcon} />
                                        : <ExpandIcon className={styles.buttonIcon} />
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.graphConnect}>
                    <div className="root" />
                </div>
            </div>

            {/* <Script src="./dist/p2p-graph-bundle.js" /> */}
            {/* <Script src="./js/graph.js"  /> */}
        </>
    )
}