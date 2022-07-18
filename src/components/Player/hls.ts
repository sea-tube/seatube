import { RefObject } from "react";
import Hls from 'hls.js';

interface HlsPlayProps {
    source: string;
    videoRef: RefObject<HTMLVideoElement>;
}

export default async function HlsPlay({ source, videoRef }: HlsPlayProps) {

    const ipfs_gateways = ["gateway.pinata.cloud", "ipfs.nftstorage.link"];

    const getHost = (url) => new URL(url).host;

    // startGraph(ipfs_gateways)

    const ACTIVE_CONNECTIONS = []

    const video = videoRef.current;

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(source);
        hls.attachMedia(video);

        video.playbackRate = 1.0;

        hls.on(Hls.Events.FRAG_LOADING, function (event, data) {
            console.log(event, data.frag.url);
            const host = getHost(data.frag.url)
            ACTIVE_CONNECTIONS.push(host)
            console.log("connecting to:", host)
            // connect(host)
        });

        hls.on(Hls.Events.ERROR, function (event, data) {
            console.log(event, data);
        });

        hls.on(Hls.Events.FRAG_LOADED, function (event, data) {
            console.log(event, data.frag.url);
            const host = getHost(data.frag.url)
            ACTIVE_CONNECTIONS.splice(ACTIVE_CONNECTIONS.indexOf(host), 1)
            // if (!ACTIVE_CONNECTIONS.includes(host)) disconnect(host)
        });
    }
    // HLS.js is not supported on platforms that do not have Media Source
    // Extensions (MSE) enabled.
    //
    // When the browser has built-in HLS support (check using `canPlayType`),
    // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
    // element through the `src` property. This is using the built-in support
    // of the plain video element, without using HLS.js.
    //
    // Note: it would be more normal to wait on the 'canplay' event below however
    // on Safari (where you are most likely to find built-in HLS support) the
    // video.src URL must be on the user-driven white-list before a 'canplay'
    // event will be emitted; the last video event that can be reliably
    // listened-for when the URL is not on the white-list is 'loadedmetadata'.
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = source;
    }
}