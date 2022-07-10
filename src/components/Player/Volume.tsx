import styles from './Volume.module.css'
import SoundIcon from "./assets/icons/sound.svg";
import MuteIcon from "./assets/icons/mute.svg";
import { useEffect, useState } from 'react';
import { ControlsProps } from './interfaces';

export default function Volume({ videoRef }: ControlsProps) {

    const [volume, setVolume] = useState<number>(100);
    const [muted, setMuted] = useState<boolean>(false);
    const [volPressing, setVolPressing] = useState<boolean>(false);

    const toggleMute = () => setMuted(!muted)

    const rangeVolume = (e) => {
        const vol = e.target.value;
        if (volume == vol) return
        setVolume(vol);
        vol == 0 ? setMuted(true) : setMuted(false);
        e.target.style.background = 'linear-gradient(to right, #fff 0%, #fff ' + vol + '%, rgba(255,255,255,.2) ' + vol + '%, rgba(255,255,255,.2) ' + (100 - vol) + '%)'
    }

    useEffect(() => {
        videoRef.current.muted = muted;
    }, [muted])

    useEffect(() => {
        videoRef.current.volume = volume / 100;
    }, [volume])

    return (
        <div className={styles.videoVolume}>

            <button
                id="button-sound" className={styles.sound} style={{
                display: muted ? "none" : "block"
            }} onClick={toggleMute}>
                <SoundIcon className={styles.icon} />
            </button>

            <button id="button-mute" className={styles.mute} onClick={toggleMute} style={{
                display: muted ? "block" : "none"
            }}>
                <MuteIcon className={styles.icon} />
            </button>

            <div className={styles.rangeVolumeContainer}>

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
    )
}