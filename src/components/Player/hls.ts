import { RefObject } from "react";
import Hls, { HlsConfig, Level, Loader, LoaderContext, PlaylistLoaderContext } from 'hls.js';

interface HlsPlayProps {
    source: string;
    videoRef: RefObject<HTMLVideoElement>;
    setResolutions: (resolutions: Level[]) => void;
}

export default function HlsPlay({ source, videoRef, setResolutions }: HlsPlayProps): Promise<Hls> {
    return new Promise((resolve, reject) => {
        const ipfs_gateways = ["gateway.pinata.cloud", "ipfs.nftstorage.link"];

        const getHost = (url) => new URL(url).host;

        // startGraph(ipfs_gateways)

        const ACTIVE_CONNECTIONS = []

        const video = videoRef.current;

        class customLoader extends Hls.DefaultConfig.loader {
            constructor(config) {
                super(config);

                // Bind default Hls load method 
                const load = this.load.bind(this);

                // Creates a blob url from hex string which can only be loaded by the client's browser
                // Example: blob:http://localhost:3000/e8ba4b17-b79a-a764-b8ef-bd2c7c5f10f7
                const blobUrlFromKey = (hexKey: string) => {
                    const octetsPairs = hexKey.match(/[\da-f]{2}/gi);
                    const keyBuffer = new Uint8Array(octetsPairs.map((h) => parseInt(h, 16)));
                    return URL.createObjectURL(new Blob([keyBuffer]))
                }

                // Set custom Hls load method
                this.load = function (context, config, callbacks) {
                    if (context.url.includes("key.bin")) {

                        // Define key as hex
                        const key = "58253fcd1c0c87f691fbfd90e8bb07f218982ded0f469a04a753922ac518f2bb";

                        // Replace original key.bin source url to blob url
                        context.url = blobUrlFromKey(key)
                    }

                    // Call default Hls load method passing our new contex.url
                    load(context, config, callbacks);
                }
            }
        }

        if (Hls.isSupported()) {
            const hls = new Hls({ loader: customLoader });

            window.hls = hls

            // ## external crypto key support en
            console.log(source)
            hls.loadSource(source);
            hls.attachMedia(video);

            video.playbackRate = 1.0;

            hls.on(Hls.Events.MANIFEST_LOADED, function (event, data) {
                setResolutions(hls.levels)
                resolve(hls)
            });


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
            /* Note: this solution not works on platforms with 
            only built-in HLS support available, like iPhone browsers */
            console.warn("Media Source Extension not supported! Using built in HLS")
            video.src = source;
        }
    })
}