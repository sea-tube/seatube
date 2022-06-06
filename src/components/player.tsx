import Script from "next/script"
import { useEffect, useState } from "react"

export default function Player({ cid }) {

    const [poster, setPoster] = useState("")

    useEffect(() => {

        const loadVideo = (url: string, type: string) => {
            const event = new CustomEvent('loadVideo', {
                detail: {
                    source: url,
                    type: type
                }
            });

            const interval = setInterval(() => {
                console.log("dispatching...")
                window.dispatchEvent(event);
            }, 1000)

            const listener = function (e) {
                console.log("cancelling interval")
                clearInterval(interval)
                window.removeEventListener('loadingVideo', listener, false)
            }
            window.addEventListener('loadingVideo', listener, false)
        }

        const customManifestSources = async (url) => {
            const response = await fetch(url)
            const m3u8 = await response.text()
            const m3u8Arr = m3u8.split("\n")
            const m3u8NewArr = []
            m3u8Arr.forEach((line) => {
                m3u8NewArr.push(
                    line.replace("output_custom", `https://${cid}.ipfs.dweb.link/output_custom`)
                )
            })
            console.info(m3u8NewArr)
            const enc = new TextEncoder();
            return URL.createObjectURL(new Blob([enc.encode(m3u8NewArr.join('\n'))]))
        }

        const getMetadata = async (cid: string) => {
            const response = await fetch(`https://ipfs.livepeer.com/ipfs/${cid}`)
            const metadata = await response.json()
            return metadata
        }

        if (!cid) return
        getMetadata(cid)
            .then((metadata: any) => {
                console.log(metadata)
                const videoCID = metadata.properties.video.replace("ipfs://", "")
                if ("transcodes" in metadata.properties && "hls" in metadata.properties.transcodes) {
                    const manifestUrl = `https://${videoCID}.ipfs.dweb.link/output_custom.m3u8`
                    customManifestSources(manifestUrl)
                        .then((url) => loadVideo(url, "hls"))
                        .catch(console.error)
                } else {
                    const videoUrl = `https://ipfs.livepeer.com/ipfs/${videoCID}`
                    loadVideo(videoUrl, "mp4")
                }
            })
            .catch(alert)
    }, [cid])

    const timeFormat = (seconds: number) => {
        const toInt = (n: number) => n | 0
        let h = seconds / (60 * 60)
        let m: any = (h - toInt(h)) * 60
        let s = ((m - toInt(m)) * 60).toFixed(0)
        if (m <= 9) m = '0' + toInt(m)
        if (Number(s) <= 9) s = '0' + s
        if (toInt(h)) return (toInt(h) + ':' + m + ':' + s)
        return (toInt(m) + ':' + s)
    }

    const rangeVideo = (e) => {
        const val = e.target.value
        const video = document.querySelector("video")
        const current = video.duration * (val / 100)
        console.log(current, video.duration)
        if (!isNaN(video.duration)) {
            video.currentTime = current
            document.querySelector(".video-time-status .current").innerHTML = timeFormat(current)
            document.getElementById("loadingProgress").style.width = val + '%'
        }
    }

    return (
        <>
            <div id="seaPlayer" style={{ width: "100%" }}>
                <div className="player aspect-video relative" style={{ maxWidth: 1024 }}>
                    <video id="myVideo" className="video " poster={poster} />
                    <div id="video-gradient" className="gradient"></div>
                    <div id="video-play" className="video-play"></div>
                    <div className="video-loading">
                        <div className="loaded-text">0%</div>
                    </div>
                    <div id="controls">
                        <div id="progressbar" className="progressbar">
                            <div className="barBackground"></div>
                            <div id="bufferingProgress"></div>
                            <div id="loadingProgress"></div>
                            <input type="range" min="0" max="100" value="0" id="rangeVideo" className="rangeVideo" onChange={rangeVideo} />
                            <div className="thumbnail" id="thumbnail"><span className="time-current">0:00</span></div>
                        </div>
                        <div id="buttons">
                            <div className="buttons-left">
                                <button id="play-button" className="play">
                                    <svg version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" x="0px"
                                        y="0px" viewBox="0 0 320.001 320.001"
                                        xmlSpace="preserve">
                                        <path
                                            d="M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288	c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144	c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z" />
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                    </svg>
                                </button>
                                <button id="pause-button" className="pause">
                                    <svg viewBox="-45 0 327 327" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="m158 0h71c4.417969 0 8 3.582031 8 8v311c0 4.417969-3.582031 8-8 8h-71c-4.417969 0-8-3.582031-8-8v-311c0-4.417969 3.582031-8 8-8zm0 0" />
                                        <path
                                            d="m8 0h71c4.417969 0 8 3.582031 8 8v311c0 4.417969-3.582031 8-8 8h-71c-4.417969 0-8-3.582031-8-8v-311c0-4.417969 3.582031-8 8-8zm0 0" />
                                    </svg>
                                </button>
                                <div className="video-time-status"><span className="current">0:00</span> / <span className="end">0:00</span>
                                </div>
                                <div className="video-volume">
                                    <button id="button-sound" className="sound">
                                        <svg version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            x="0px" y="0px" viewBox="0 0 480 480"
                                            xmlSpace="preserve">
                                            <path
                                                d="M278.944,17.577c-5.568-2.656-12.128-1.952-16.928,1.92L106.368,144.009H32c-17.632,0-32,14.368-32,32v128	c0,17.664,14.368,32,32,32h74.368l155.616,124.512c2.912,2.304,6.464,3.488,10.016,3.488c2.368,0,4.736-0.544,6.944-1.6	c5.536-2.656,9.056-8.256,9.056-14.4v-416C288,25.865,284.48,20.265,278.944,17.577z" />
                                            <path
                                                d="M368.992,126.857c-6.304-6.208-16.416-6.112-22.624,0.128c-6.208,6.304-6.144,16.416,0.128,22.656	C370.688,173.513,384,205.609,384,240.009s-13.312,66.496-37.504,90.368c-6.272,6.176-6.336,16.32-0.128,22.624	c3.136,3.168,7.264,4.736,11.36,4.736c4.064,0,8.128-1.536,11.264-4.64C399.328,323.241,416,283.049,416,240.009	S399.328,156.777,368.992,126.857z" />
                                            <path
                                                d="M414.144,81.769c-6.304-6.24-16.416-6.176-22.656,0.096c-6.208,6.272-6.144,16.416,0.096,22.624	C427.968,140.553,448,188.681,448,240.009s-20.032,99.424-56.416,135.488c-6.24,6.24-6.304,16.384-0.096,22.656	c3.168,3.136,7.264,4.704,11.36,4.704c4.064,0,8.16-1.536,11.296-4.64C456.64,356.137,480,299.945,480,240.009	S456.64,123.881,414.144,81.769z" />
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                        </svg>
                                    </button>
                                    <button id="button-mute" className="mute">
                                        <svg fill="#eee" version="1.1" id="Capa_1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            x="0px" y="0px" viewBox="0 0 448.075 448.075"
                                            xmlSpace="preserve">
                                            <path
                                                d="M352.021,16.075c0-6.08-3.52-11.84-8.96-14.4c-5.76-2.88-12.16-1.92-16.96,1.92l-141.76,112.96l167.68,167.68V16.075z" />
                                            <path
                                                d="M443.349,420.747l-416-416c-6.24-6.24-16.384-6.24-22.624,0s-6.24,16.384,0,22.624l100.672,100.704h-9.376	c-9.92,0-18.56,4.48-24.32,11.52c-4.8,5.44-7.68,12.8-7.68,20.48v128c0,17.6,14.4,32,32,32h74.24l155.84,124.48	c2.88,2.24,6.4,3.52,9.92,3.52c2.24,0,4.8-0.64,7.04-1.6c5.44-2.56,8.96-8.32,8.96-14.4v-57.376l68.672,68.672	c3.136,3.136,7.232,4.704,11.328,4.704s8.192-1.568,11.328-4.672C449.589,437.131,449.589,427.019,443.349,420.747z" />
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                            <g></g>
                                        </svg>
                                    </button>
                                    <div className="rangeVolume_f">
                                        <input type="range" min="0" max="100" value="100" className="rangeVolume" onChange={console.log} />
                                    </div>
                                </div>
                            </div>
                            <div className="buttons-right">
                                <button className="settings" id="settings">
                                    <div className="resolutions" id="resolutions">
                                        <ul></ul>
                                    </div>
                                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                        x="0px" y="0px" viewBox="0 0 426.667 426.667"
                                        xmlSpace="preserve">
                                        <g>
                                            <g>
                                                <path d="M416.8,269.44l-45.013-35.307c0.853-6.827,1.493-13.76,1.493-20.8s-0.64-13.973-1.493-20.8l45.12-35.307
                   c4.053-3.2,5.227-8.96,2.56-13.653L376.8,69.653c-2.667-4.587-8.213-6.507-13.013-4.587l-53.12,21.44
                   c-10.987-8.427-23.04-15.573-36.053-21.013l-8-56.533C265.653,3.947,261.28,0,255.947,0h-85.333c-5.333,0-9.707,3.947-10.56,8.96
                   l-8,56.533c-13.013,5.44-25.067,12.48-36.053,21.013l-53.12-21.44c-4.8-1.813-10.347,0-13.013,4.587L7.2,143.573
                   c-2.667,4.587-1.493,10.347,2.56,13.653l45.013,35.307c-0.853,6.827-1.493,13.76-1.493,20.8s0.64,13.973,1.493,20.8L9.76,269.44
                   c-4.053,3.2-5.227,8.96-2.56,13.653l42.667,73.92c2.667,4.587,8.213,6.507,13.013,4.587L116,340.16
                   c10.987,8.427,23.04,15.573,36.053,21.013l8,56.533c0.853,5.013,5.227,8.96,10.56,8.96h85.333c5.333,0,9.707-3.947,10.56-8.96
                   l8-56.533c13.013-5.44,25.067-12.48,36.053-21.013l53.12,21.44c4.8,1.813,10.347,0,13.013-4.587l42.667-73.92
                   C422.027,278.507,420.853,272.747,416.8,269.44z M213.28,288c-41.28,0-74.667-33.387-74.667-74.667S172,138.667,213.28,138.667
                   s74.667,33.387,74.667,74.667S254.56,288,213.28,288z" />
                                            </g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                    </svg>

                                </button>
                                <button className="seek-slides" id="seek-slides">
                                    <svg width="19px" height="19px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"
                                        enableBackground="new 0 0 129 129">
                                        <g>
                                            <path
                                                d="m10.5,58.9h44.3c2.3,0 4.1-1.8 4.1-4.1v-44.3c0-2.3-1.8-4.1-4.1-4.1h-44.3c-2.3,0-4.1,1.8-4.1,4.1v44.3c0,2.2 1.9,4.1 4.1,4.1zm4.1-44.3h36.1v36.1h-36.1v-36.1z">
                                            </path>
                                            <path
                                                d="m122.6,10.5c0-2.3-1.8-4.1-4.1-4.1h-44.3c-2.3,0-4.1,1.8-4.1,4.1v44.3c0,2.3 1.8,4.1 4.1,4.1h44.3c2.3,0 4.1-1.8 4.1-4.1v-44.3zm-8.2,40.2h-36.1v-36.1h36.1v36.1z">
                                            </path>
                                            <path
                                                d="m10.5,122.6h44.3c2.3,0 4.1-1.8 4.1-4.1v-44.3c0-2.3-1.8-4.1-4.1-4.1h-44.3c-2.3,0-4.1,1.8-4.1,4.1v44.3c0,2.2 1.9,4.1 4.1,4.1zm4.1-44.3h36.1v36.1h-36.1v-36.1z">
                                            </path>
                                            <path
                                                d="m118.5,70.1h-44.3c-2.3,0-4.1,1.8-4.1,4.1v44.3c0,2.3 1.8,4.1 4.1,4.1h44.3c2.3,0 4.1-1.8 4.1-4.1v-44.3c0-2.2-1.9-4.1-4.1-4.1zm-4.1,44.3h-36.1v-36.1h36.1v36.1z">
                                            </path>
                                        </g>
                                    </svg>
                                </button>
                                <button className="fullScreen">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                        x="0px" y="0px" viewBox="0 0 298.667 298.667"
                                        xmlSpace="preserve">
                                        <g>
                                            <g>
                                                <g>
                                                    <polygon
                                                        points="42.667,192 0,192 0,298.667 106.667,298.667 106.667,256 42.667,256 			" />
                                                    <polygon
                                                        points="0,106.667 42.667,106.667 42.667,42.667 106.667,42.667 106.667,0 0,0 			" />
                                                    <polygon
                                                        points="192,0 192,42.667 256,42.667 256,106.667 298.667,106.667 298.667,0 			" />
                                                    <polygon
                                                        points="256,256 192,256 192,298.667 298.667,298.667 298.667,192 256,192 			" />
                                                </g>
                                            </g>
                                        </g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                        <g></g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="graphConnect">
                        <div className="root"></div>
                    </div>
                </div>
            </div>

            <Script src="/player/js/dom.js" />
            {/* <Script src="/player/dist/p2p-graph-bundle.js" /> */}
            {/* <Script src="/player/js/graph.js"  /> */}
            <Script src="https://cdn.jsdelivr.net/npm/hls.js@latest" />
            <Script src="/player/js/main.js" />
        </>
    )
}