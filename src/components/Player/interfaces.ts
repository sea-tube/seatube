import { Level } from "hls.js";
import { RefObject } from "react";

export interface MediaResolution {
    width: number;
    height: number;
}

export interface PlayerProps {
    source: string;
    poster?: string;
    type?: string;
    mediaResolution?: MediaResolution;
}

export interface ControlsProps {
    videoRef: RefObject<HTMLVideoElement>;
    onPlay?: () => void;
    onPause?: () => void;
    isFullScreen?: boolean;
    onFullScreen?: (status: boolean) => void;
    onSeekingStart?: () => void;
    onSeekingEnd?: () => void;
    resolutions?: Level[];
    onChangeResolution?: (index: number) => void;
}

export interface ControlsMobileProps {
    videoRef: RefObject<HTMLVideoElement>;
    isFullScreen?: boolean;
    onFullScreen?: (status: boolean) => void;
    onSeekingStart?: () => void;
    onSeekingEnd?: () => void;
}

export interface VolumeProps {
    videoRef: RefObject<HTMLVideoElement>;
}

export interface ProgressBarProps {
    videoRef: RefObject<HTMLVideoElement>;
    onSeekingStart?: () => void;
    onSeekingEnd?: () => void;
}

type ExitFullscreen = typeof document.exitFullscreen
type RequestFullscreen = typeof document.documentElement.requestFullscreen;
type SupportsFullscreen = boolean;
type DisplayingFullScreen = boolean;
export interface VideoElement extends HTMLVideoElement {
    webkitSupportsFullscreen: SupportsFullscreen;
    webkitDisplayingFullscreen: DisplayingFullScreen;
    webkitExitFullscreen: ExitFullscreen;
    webkitEnterFullScreen: RequestFullscreen;
    mozRequestFullScreen: RequestFullscreen;
    mozCancelFullScreen: ExitFullscreen;
}