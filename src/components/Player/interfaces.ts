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
    onFullScreen?: (status: boolean) => void;
}

export interface ControlsMobileProps {
    videoRef: RefObject<HTMLVideoElement>;
    onFullScreen?: (status: boolean) => void;
}

export interface ProgressBarProps {
    videoRef: RefObject<HTMLVideoElement>;
    onSeekingStart?: () => void;
    onSeekingEnd?: () => void;
}

export interface ControlsProps {
    videoRef: RefObject<HTMLVideoElement>;
}