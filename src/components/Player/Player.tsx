// External components
import { useEffect, useRef, useState } from "react";

// Player internal components
import config from './config.json';
import styles from './Player.module.css';
import { ensureAnimation } from "./utils";
import { PlayerProps, VideoElement } from "./interfaces";
import HlsPlay from './hls';
import Controls from './Controls';
import ControlsMobile from './ControlsMobile';
import GraphConnect, { NodesData } from './GraphConnect';

// Icons
import PlayIcon from "./assets/icons/play.svg";
import PauseIcon from "./assets/icons/pause.svg";
import OvalLoading from "./assets/animations/oval.svg";
import Hls, { Level } from "hls.js";

export default function Player({ source, type, poster, mediaResolution }: PlayerProps) {

    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [videoPlay, setVideoPlay] = useState<boolean>(false);
    const [videoPaused, setVideoPaused] = useState<boolean>(false);
    const [animating, setAnimating] = useState<null | 'playing' | 'pausing'>(null);
    const [canPlay, setCanPlay] = useState<boolean>(false);
    const [waiting, setWaiting] = useState<boolean>(true);
    const [bufferingProgress, setBufferingProgress] = useState<number>(0);
    const [fullScreen, setFullScreen] = useState<boolean>(false);
    const [nativeFulScreen, setNativeFullScreen] = useState<boolean>(false);
    const [isSeeking, setIsSeeking] = useState<boolean>(false);
    const [resolutions, setResolutions] = useState<Level[]>([]);
    const [hlsController, setHlsController] = useState<Hls>(null);

    const [nodesData, setNodesData] = useState<NodesData>([
        { id: "seatube", name: "Seatube", connected: true },
        { id: "infura", name: "Infura", connected: false },
        { id: "livepeer", name: "Livepeer", connected: false },
        { id: "nft-storage", name: "NFT.storage", connected: false },
        { id: "gateway", name: "Gateway", connected: false },
    ]);

    useEffect(() => {
        console.log("nodes data changed", nodesData);
    }, [nodesData])

    const connectToggle = () => {
        const nodesDatac = [ ...nodesData ];
        for (let i = 0; i < nodesDatac.length; i++) {
            nodesDatac[i].connected = nodesDatac[i].connected ? false : true;
        }
        setNodesData(nodesDatac);
    }

    const playerRef = useRef<HTMLDivElement>();
    const videoRef = useRef<VideoElement>();
    const videoPlayRef = useRef<HTMLDivElement>();

    useEffect(() => {
        const userAgent = navigator.userAgent; // get the user-agent from the headers
        const isMobileAgent = Boolean(userAgent.match(
            /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        ));
        setIsMobile(isMobileAgent);
    }, [])

    useEffect(() => {
        if ((isMobile && config.nativeFullScreen.mobile)
            || (!isMobile && config.nativeFullScreen.desktop)) {
            setNativeFullScreen(true);
        } else {
            setNativeFullScreen(false);
        }
    }, [isMobile])

    // Animate Play / Pause
    useEffect(() => {
        if (isSeeking) console.log("is seeking")
        if (!isSeeking && canPlay && !animating) {
            const animation = videoPlay ? "playing" : "pausing";
            ensureAnimation(async () => {
                setAnimating(animation);
                // alert("here")
                videoPlayRef.current.classList.add(styles.animate);
            }, 700)
                .then(() => {
                    videoPlayRef.current.classList.remove(styles.animate);
                    setAnimating(null);
                })
        }
    }, [videoPlay])

    useEffect(() => {

        if (videoRef.current) {

            (async () => {
                // load hls
                if (type == "hls") {
                    const hls = await HlsPlay({ source, videoRef, setResolutions });
                    console.log("************* hls here", hls.levels)
                    setHlsController(hls);
                } else {
                    videoRef.current.src = source;
                }
            })();

            // Detect full screen change
            ['fullscreenchange', 'webkitfullscreenchange'].forEach(
                (eventType) => videoRef.current.addEventListener(eventType, (() => {
                    if ((document.fullscreenElement && document.fullscreenElement.id == "video")) {
                        reportFullScreenOn();
                    } else {
                        reportFullScreenOff();
                    }
                }), false)
            );

            // Detect full screen change (iOS)
            videoRef.current.addEventListener('webkitbeginfullscreen', reportFullScreenOn, false);
            videoRef.current.addEventListener('webkitendfullscreen', reportFullScreenOff, false);

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
        playerRef.current.classList.remove(styles.paused);
        playerRef.current.classList.add(styles.playing);
        connectToggle();
    }

    const reportPause = () => {
        setVideoPlay(false);
        setVideoPaused(true);
        playerRef.current.classList.remove(styles.playing);
        playerRef.current.classList.add(styles.paused);
        connectToggle();
    }

    const reportWaiting = () => {
        setWaiting(true);
        setCanPlay(false);
    }

    const reportCanPlay = () => {
        setWaiting(false);
        setCanPlay(true);
    }

    const reportFullScreenOn = () => {
        setFullScreen(true);
    }

    const reportFullScreenOff = () => {
        setFullScreen(false);
    }

    const enableFullScreen = async () => {
        if (nativeFulScreen) {
            try {
                if (videoRef.current.webkitEnterFullScreen) {
                    await videoRef.current.webkitEnterFullScreen();
                } else if (videoRef.current.mozRequestFullScreen) {
                    await videoRef.current.mozRequestFullScreen();
                } else {
                    throw ("native full screen unavailable");
                }
            } catch (err) {
                alert(err);
            }
        } else {
            playerRef.current.classList.add(styles.fullScreen);
            reportFullScreenOn();
        }
    }

    const disableFullScreen = () => {
        if (nativeFulScreen) {
            try {
                if (videoRef.current.webkitExitFullscreen) {
                    videoRef.current.webkitExitFullscreen();
                } else if (videoRef.current.mozCancelFullScreen) {
                    videoRef.current.mozCancelFullScreen();
                } else {
                    throw ("native full screen unavailable");
                }
            } catch (err) {
                alert(err);
            }
        } else {
            playerRef.current.classList.remove(styles.fullScreen);
            reportFullScreenOff();
        }
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
                    style={{
                        height: mediaResolution && playerRef.current ? playerRef.current.clientWidth / (mediaResolution.width / mediaResolution.height) : 'auto'
                    }}
                    ref={videoRef}
                    poster={poster}
                    autoPlay={true}
                    onCanPlay={reportCanPlay}
                    onWaiting={reportWaiting}
                    onProgress={reportBuffer}
                    onPlay={reportPlay}
                    onPause={reportPause}
                    controls={(fullScreen && nativeFulScreen) ? true : false}
                    playsInline={true}
                />
                <div id="video-gradient" className={styles.gradient} />
                <div id="video-play-toggle" className={styles.videoPlayToggle}
                    onClick={togglePlay}
                    style={{
                        opacity: (videoPlay && !animating) || isSeeking ? 0 : 1
                    }}
                >
                    <div id="video-play"
                        className={styles.videoPlay}
                        ref={videoPlayRef}
                        onClick={togglePlay}
                    >
                        {
                            (animating == "pausing") &&
                            <PauseIcon style={{
                                width: "50%"
                            }} fill="#e6e6e6" />
                        }
                        {

                            ((!videoPlay && canPlay && animating != "pausing") || animating == "playing") &&
                            <PlayIcon style={{
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
                        isFullScreen={fullScreen}
                        videoRef={videoRef}
                        onFullScreen={(status) => status ? enableFullScreen() : disableFullScreen()}
                        onSeekingStart={() => setIsSeeking(true)}
                        onSeekingEnd={() => setIsSeeking(false)}
                    // resolutions={resolutions}
                    // onChangeResolution={(index) => hlsController.nextLevel = index}
                    />
                </div>

                <div className={styles.controlsMobile}>
                    <ControlsMobile
                        isFullScreen={fullScreen}
                        videoRef={videoRef}
                        onFullScreen={(status) => status ? enableFullScreen() : disableFullScreen()}
                        onSeekingStart={() => setIsSeeking(true)}
                        onSeekingEnd={() => setIsSeeking(false)}
                    />
                </div>

                {
                    playerRef.current &&
                    <GraphConnect nodes={nodesData} />
                }


            </div>
        </>
    )
}