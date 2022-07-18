import { RefObject } from "react";

export interface PlayerProps {
    source: string;
    poster?: string;
    type?: string;
}

export interface ControlsProps {
    videoRef: RefObject<HTMLVideoElement>;
    onPlay?: () => void;
    onPause?: () => void;
    isFullScreen?: boolean;
    onFullScreen?: (status: boolean) => void;
    onSeekingStart?: () => void;
    onSeekingEnd?: () => void;
}

export interface ControlsMobileProps {
    videoRef: RefObject<HTMLVideoElement>;
    isFullScreen?: boolean;
    onFullScreen?: (status: boolean) => void;
    onSeekingStart?: () => void;
    onSeekingEnd?: () => void;
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