import { RefObject, useEffect, useRef, useState } from 'react';
import styles from './Player.module.css'
import { timeFormat } from './utils';


interface ProgressBarProps {
    videoRef: RefObject<HTMLVideoElement>;
}

export default function ProgressBar({ videoRef }: ProgressBarProps) {

    const thumbnailRef = useRef<HTMLDivElement>();

    const [previewTime, setPreviewTime] = useState<string>('0:00');
    const [bufferingProgress, setBufferingProgress] = useState<number>(0);
    const [loadingProgress, setLoadingProgress] = useState<number>(0);


    useEffect(() => {

        if (videoRef.current.canPlayType) {
            // add event-handlers to control the video element

            videoRef.current.addEventListener("timeupdate", reportProgress, false);
            videoRef.current.addEventListener("progress", reportBuffer, false);
        }

    }, [videoRef])

    // Set thumb
    function thumb(time: number) {
        const thumb_interval = 5;
        const row_size = 10;
        const width = 188, height = 80;
        time = Math.round(time / thumb_interval);
        const frameY = Math.round(time / row_size);
        const frameX = time - row_size * frameY;
        const frameTop = frameY * height;
        const frameLeft = frameX * width;
        const position = `-${frameLeft}px -${frameTop}px`;
        thumbnailRef.current.style.backgroundPosition = position;
    }

    /* Thumbnail bar */
    const mouseMoveHandler = (e) => {

        // Set positions
        const rangeWidth = e.target.getBoundingClientRect().width;
        const rangeLeft = e.target.getBoundingClientRect().left;
        const thumbWidth = thumbnailRef.current.getBoundingClientRect().width;
        const thumbLeft = thumbnailRef.current.getBoundingClientRect().left;

        // Set position
        let positionLeft = e.clientX - rangeLeft - (thumbWidth / 2);
        const positionRight = positionLeft + thumbWidth;
        if (positionLeft < 0) positionLeft = 0;
        if (positionRight > rangeWidth) positionLeft = rangeWidth - thumbWidth;
        thumbnailRef.current.style.left = positionLeft + "px";

        // Determine time and set thumb
        const percentage = 100 / (rangeWidth / (e.clientX - rangeLeft));
        const videoDuration = videoRef.current.duration;
        const time = Math.round(videoDuration * (percentage / 100))
        setPreviewTime(timeFormat(time));
        thumb(time)
    }

    const seekVideo = (e) => {
        const val = e.target.value
        const video = document.querySelector("video")
        const current = video.duration * (val / 100)
        if (!isNaN(video.duration)) {
            video.currentTime = current
            document.querySelector(".videoTimeStatus .current").innerHTML = timeFormat(current)
            document.getElementById("loadingProgress").style.width = val + '%'
        }
    }

    function reportProgress(e) {
        // Update the progress bar

        const position = 100 / (e.target.duration / e.target.currentTime);
        if (isNaN(position)) return;

        if (e.target.buffered.length &&
            Math.round(e.target.buffered.end(0)) == Math.round(e.target.seekable.end(0))) {
            setBufferingProgress(100); // buffer 100%
        }


        setLoadingProgress(position);

        //if (rVideoPressing === false) rangeVideo.value = position

    }

    function reportBuffer(e) {
        // Update buffering bar

        if (isNaN(e.target.duration) || e.target.buffered.length == 0) return;
        const videoBuffered = 100 / (e.target.duration / e.target.buffered.end(0));
        setBufferingProgress(videoBuffered);
    }

    return (
        <>
            <div id="progressbar" className={styles.progressbar}>
                <div className={styles.barBackground} />
                <div id="bufferingProgress" className={styles.bufferingProgress} style={{
                    width: `${bufferingProgress}%`
                }} />
                <div id="loadingProgress" className={styles.loadingProgress} style={{
                    width: `${loadingProgress}%`
                }} />
                <input type="range" min={0} max={100} value={0} id="range-video"
                    className={styles.rangeVideo} onChange={seekVideo} onMouseMove={mouseMoveHandler} />
                <div id="thumbnail" className={styles.thumbnail} ref={thumbnailRef}>
                    <span id="time-current" className={styles.timeCurrent}>{previewTime}</span>
                </div>
            </div>
        </>
    )
}