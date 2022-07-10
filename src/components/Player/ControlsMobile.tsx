import styles from './ControlsMobile.module.css'
import ProgressBar from './ProgressBar'

import ExpandIcon from "./assets/icons/expand.svg";
import ShrinkIcon from "./assets/icons/shrink.svg";
import { useEffect, useState } from 'react';
import { timeFormat } from './utils';
import { ControlsMobileProps } from './interfaces';

export default function ControlsMobile({ videoRef, onFullScreen }: ControlsMobileProps) {

    const [timeCurrent, setTimeCurrent] = useState<string>('0:00');
    const [timeDuration, setTimeDuration] = useState<string>('0:00');
    const [isSeeking, setIsSeeking] = useState<boolean>(false);
    const [fullScreen, setFullScreen] = useState<boolean>(false);

    useEffect(() => {
        if (videoRef.current.canPlayType) {
            // add event-handlers to listen video status
            videoRef.current.addEventListener("updateTime", updateTime, false);
            videoRef.current.addEventListener("durationchange", updateTime, false);
        }
    }, [videoRef])

    const updateTime = (e) => {
        setTimeCurrent(timeFormat(e.target.currentTime));
        setTimeDuration(timeFormat(e.target.duration));
    }

    const toggleFullScreenMode = () => {
        onFullScreen && onFullScreen(!fullScreen);
        setFullScreen(!fullScreen);
    }

    return (
        <div id="controls-mobile" className={styles.controlsMobile}>
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 15,
                opacity: isSeeking ? 0 : 1
            }}>
                <div id="video-time-status-mobile" className="videoTimeStatus">
                    <span className="current">{timeCurrent}</span>
                    / <span className="end">{timeDuration}</span>
                </div>
                <button id="full-screen" onClick={() => toggleFullScreenMode()}>
                    {
                        fullScreen
                            ? <ShrinkIcon className={styles.buttonIconMobile} />
                            : <ExpandIcon className={styles.buttonIconMobile} />
                    }
                </button>
            </div>
            <ProgressBar videoRef={videoRef} onSeekingStart={() => setIsSeeking(true)} onSeekingEnd={() => setIsSeeking(false)} />
        </div>
    )
}