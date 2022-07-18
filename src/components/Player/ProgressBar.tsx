import { useEffect, useRef, useState } from 'react';
import { ProgressBarProps } from './interfaces';
import styles from './ProgressBar.module.css'
import { timeFormat } from './utils';

export default function ProgressBar({ videoRef, onSeekingStart, onSeekingEnd }: ProgressBarProps) {

    const thumbnailRef = useRef<HTMLDivElement>();

    const [previewTime, setPreviewTime] = useState<string>('0:00');
    const [bufferingProgress, setBufferingProgress] = useState<number>(0);
    const [loadingProgress, setLoadingProgress] = useState<number>(0);
    const [timedBar, setTimedBar] = useState<number>(0);
    const [playOnSeekEnd, setPlayOnSeekEnd] = useState<boolean>(false);

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
    const seekBarHandler = (e) => {

        // Set positions
        const rangeWidth = e.target.getBoundingClientRect().width;
        const rangeLeft = e.target.getBoundingClientRect().left;
        const thumbWidth = thumbnailRef.current.getBoundingClientRect().width;

        let pointer;
        if (e.type == "touchmove") {
            pointer = e.touches[0].pageX;
        } else if (e.type == "mousemove") {
            pointer = e.clientX;
        }

        // Set position
        let positionLeft = pointer - rangeLeft - (thumbWidth / 2);
        const positionRight = positionLeft + thumbWidth;
        if (positionLeft < 0) positionLeft = 0;
        if (positionRight > rangeWidth) positionLeft = rangeWidth - thumbWidth;
        thumbnailRef.current.style.left = positionLeft + "px";

        // Determine time and set thumb
        const percentage = 100 / (rangeWidth / (pointer - rangeLeft));
        setTimedBar(percentage);
        const videoDuration = videoRef.current.duration;
        const time = Math.round(videoDuration * (percentage / 100))
        setPreviewTime(timeFormat(time));
        thumb(time)
    }

    const seekVideo = (e) => {
        const val = e.target.value
        const current = videoRef.current.duration * (val / 100)
        setLoadingProgress(val);
        if (!isNaN(videoRef.current.duration)) {
            videoRef.current.currentTime = current
            document.querySelector(".videoTimeStatus .current").innerHTML = timeFormat(current)
            document.getElementById("loadingProgressBar").style.width = val + '%'
        }
    }

    const onSeekingPressing = () => {

        onSeekingStart && onSeekingStart();

        // Video must be paused while seeking
        // Save state before seeking
        if (videoRef.current.paused) {
            setPlayOnSeekEnd(false);
        } else {
            setPlayOnSeekEnd(true);
            videoRef.current.pause()
        }
    }

    const onSeekingReleased = async () => {

        // After seeking release, play the video,
        // unless it was paused before seeking
        if (playOnSeekEnd) await videoRef.current.play();

        onSeekingEnd && onSeekingEnd();
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
                <div id="timedBar" className={styles.timedBar} style={{
                    width: `${timedBar}%`
                }} />
                <div id="bufferingProgress" className={styles.bufferingProgress} style={{
                    width: `${bufferingProgress}%`
                }} />
                <div id="loadingProgressBar" className={styles.loadingProgressBar} style={{
                    width: `${loadingProgress}%`
                }}>
                    <div className={styles.sliderThumb} />
                </div>
                <input
                    id="range-video"
                    className={styles.slider}
                    type="range"
                    min={0}
                    max={100}
                    value={loadingProgress}
                    onChange={seekVideo}
                    onMouseMove={seekBarHandler}
                    onMouseDown={onSeekingPressing}
                    onMouseUp={onSeekingReleased}
                    onTouchMove={(e) => seekBarHandler(e)}
                    onTouchStart={onSeekingPressing}
                    onTouchEnd={onSeekingReleased}
                />
                <div id="thumbnail" className={styles.thumbnail} ref={thumbnailRef}>
                    <span id="time-current" className={styles.timeCurrent}>{previewTime}</span>
                </div>
            </div>
        </>
    )
}