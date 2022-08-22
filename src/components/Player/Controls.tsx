import { useEffect, useRef, useState } from 'react';
import styles from './Controls.module.css'

import PlayIcon from "./assets/icons/play.svg";
import PauseIcon from "./assets/icons/pause.svg";
import SettingsIcon from "./assets/icons/settings.svg";
import SeekIcon from "./assets/icons/seek.svg";
import ExpandIcon from "./assets/icons/expand.svg";
import ShrinkIcon from "./assets/icons/shrink.svg";

import ProgressBar from "./ProgressBar";
import Volume from './Volume';
import { timeFormat } from './utils';
import { ControlsProps } from './interfaces';

export default function Controls({ videoRef, onPlay, onPause, isFullScreen = true, onFullScreen, onSeekingStart, onSeekingEnd, resolutions, onChangeResolution }: ControlsProps) {

    const [videoPlay, setVideoPlay] = useState<boolean>(false);
    const [timeCurrent, setTimeCurrent] = useState<string>('0:00');
    const [timeDuration, setTimeDuration] = useState<string>('0:00');

    const resolutionsControlRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (videoRef.current.canPlayType) {
            // add event-handlers to listen video status
            videoRef.current.addEventListener("updateTime", updateTime, false);
            videoRef.current.addEventListener("durationchange", updateTime, false);
            videoRef.current.addEventListener("play", reportPlay, false);
            videoRef.current.addEventListener("pause", reportPause, false);
        }
    }, [videoRef])

    const reportPlay = () => {
        setVideoPlay(true);
        onPlay && onPlay();
    }

    const reportPause = () => {
        setVideoPlay(false);
        onPause && onPause();
    }

    const play = () => {
        videoRef.current.play();
    }
    const pause = () => {
        videoRef.current.pause();
    }

    const updateTime = (e) => {
        setTimeCurrent(timeFormat(e.target.currentTime));
        setTimeDuration(timeFormat(e.target.duration));
    }

    const toggleFullScreenMode = () => {
        onFullScreen && onFullScreen(!isFullScreen);
    }

    const toggleResolutionControl = () => {
        resolutionsControlRef.current.classList.toggle(styles.resolutionsActive);
    }

    return (
        <div id="controls" className={styles.controls}>

            <ProgressBar videoRef={videoRef} onSeekingStart={onSeekingStart} onSeekingEnd={onSeekingEnd} />

            {/* Buttons Left */}
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

                    <Volume videoRef={videoRef} />

                </div>

                {/* Buttons Right */}
                <div className={styles.buttonsRight}>
                    <button id="settings" className={styles.settings} onClick={toggleResolutionControl}>
                        <div id="resolutions" className={styles.resolutions} ref={resolutionsControlRef}>
                            <ul>
                                {
                                    resolutions?.map((resolution, index) => (
                                        <li key={resolution.name} onClick={() => onChangeResolution(index)}>
                                            {resolution.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <SettingsIcon className={styles.buttonIcon} />
                    </button>
                    <button className="seek-slides" id="seek-slides">
                        <SeekIcon className={styles.buttonIcon} />
                    </button>
                    <button id="full-screen" onClick={() => toggleFullScreenMode()}>
                        {
                            isFullScreen
                                ? <ShrinkIcon className={styles.buttonIcon} />
                                : <ExpandIcon className={styles.buttonIcon} />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}