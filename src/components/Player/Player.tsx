import Script from "next/script"

import styles from './Player.module.css'
import { timeFormat } from "./controllers/utils";

import PlayIcon from "./assets/icons/play.svg";
import SoundIcon from "./assets/icons/sound.svg";
import MuteIcon from "./assets/icons/mute.svg";
import PauseIcon from "./assets/icons/pause.svg";
import SettingsIcon from "./assets/icons/settings.svg";
import SeekIcon from "./assets/icons/seek.svg";
import ExpandIcon from "./assets/icons/expand.svg";
import { PlayerProps } from "./interface";
import { useEffect, useState } from "react";

import PlayerDOM from "./controllers/dom";
import PlayerMain from "./controllers/main";

export default function Player({ cid, poster }: PlayerProps) {

    const [videoVolume, setVideoVolume] = useState<number>(100);
    const [volPressing, setVolPressing] = useState<boolean>(false);

    useEffect(() => {
        PlayerDOM();
        PlayerMain();
    }, [])

    const rangeVideo = (e) => {
        const val = e.target.value
        const video = document.querySelector("video")
        const current = video.duration * (val / 100)
        console.log(current, video.duration)
        if (!isNaN(video.duration)) {
            video.currentTime = current
            document.querySelector(".videoTimeStatus .current").innerHTML = timeFormat(current)
            document.getElementById("loadingProgress").style.width = val + '%'
        }
    }

    const rangeVolume = (e) => {
        console.log(e.target.value)
        const vol = e.target.value;
        setVideoVolume(vol);
        e.target.style.background = 'linear-gradient(to right, #fff 0%, #fff ' + vol + '%, rgba(255,255,255,.2) ' + vol + '%, rgba(255,255,255,.2) ' + (100 - vol) + '%)'
        // changeVolume(vol)
    }

    return (
        <>

            <div id="seaPlayer" className={styles.player}>
                <video id="video" className={styles.video} poster={poster} autoPlay={false} />
                <div id="video-gradient" className={styles.gradient} />
                <div id="video-play" className={styles.videoPlay} />
                <div id="video-loading" className={styles.videoLoading}>
                    <div id="loaded-title" className={styles.loadedTitle}>0%</div>
                </div>
                <div id="controls" className={styles.controls}>
                    <div id="progressbar" className={styles.progressbar}>
                        <div className={styles.barBackground} />
                        <div id="bufferingProgress" className={styles.bufferingProgress} />
                        <div id="loadingProgress" className={styles.loadingProgress} />
                        <input type="range" min="0" max="100" value="0" id="range-video" className={styles.rangeVideo} onChange={rangeVideo} />
                        <div id="thumbnail" className={styles.thumbnail}>
                            <span id="time-current" className={styles.timeCurrent}>0:00</span>
                        </div>
                    </div>
                    <div id="buttons" className={styles.buttons}>
                        <div className={styles.buttonsLeft}>
                            <button id="play-button" className={styles.button}>
                                <PlayIcon className={styles.buttonIcon} />
                            </button>
                            <button id="pause-button" className={styles.button}>
                                <PauseIcon className={styles.buttonIcon} />
                            </button>
                            <div id="video-time-status" className="videoTimeStatus">
                                <span className="current">0:00</span> / <span className="end">0:00</span>
                            </div>
                            <div className={styles.videoVolume}>
                                <button id="button-sound" className={styles.sound} style={{
                                    display: videoVolume == 0 ? "none" : "block"
                                }}>
                                    <SoundIcon className={styles.buttonIcon} />
                                </button>
                                <button id="button-mute" className={styles.mute} style={{
                                    display: videoVolume == 0 ? "block" : "none"
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
                                        value={100}
                                        id="range-volume"
                                        className={styles.rangeVolume}
                                        onChange={rangeVolume}
                                        onMouseMove={(e) => {
                                            if (volPressing) {
                                                console.log("yes is pressing")
                                                rangeVolume(e)
                                            } else {
                                                console.log("is not pressing")
                                            }
                                        }}
                                        onMouseDown={() => {
                                            console.log("pressed!")
                                            setVolPressing(true)
                                        }}
                                        onMouseUp={() => {
                                            console.log("released!")
                                            setVolPressing(false)
                                        }}
                                    />
                                    <div className={styles.rangeVolumeThumb} style={{
                                        left: `${videoVolume}%`
                                    }}/>
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
                            <button id="full-screen">
                                <ExpandIcon className={styles.buttonIcon} />
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
                {/* <Script src="https://cdn.jsdelivr.net/npm/hls.js@latest" /> */}
        </>
    )
}