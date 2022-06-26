async function hlsPlay(videoSrc) {

    const ipfs_gateways = ["gateway.pinata.cloud", "ipfs.nftstorage.link"]

    const getHost = (url) => new URL(url).host

    // startGraph(ipfs_gateways)

    const ACTIVE_CONNECTIONS = []

    const video = document.getElementById('video');

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
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
        video.src = videoSrc;
    }
}

export default function PlayerMain() {

    // Listen for the event.
    window.addEventListener('loadVideo', function (e) {
        console.log("video", document.getElementById('video'))
        console.log("eventLoadVideo", e.detail)
        if (e.detail.type == "hls") {
            hlsPlay(e.detail.source)
        } else {
            console.log("not hls")
            const video = document.getElementById('video');
            video.src = e.detail.source
        }
        const event = new CustomEvent('loadingVideo');
        window.dispatchEvent(event);
    }, false);

}
