import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from 'components/layout'
import { getVideo, videosData } from 'components/logic/Videos'
import Player from 'components/Player'
import { isCid } from 'utils/Verify'

export default function Watch() {

    const router = useRouter()

    const { cid } = router.query;

    const [videoFileCid, setVideoFileCid] = useState<string | null>(null);
    const [videoName, setVideoName] = useState<string | null>(null);
    const [videoPoster, setVideoPoster] = useState<string | null>(null);

    useEffect(() => {

        if (cid) {

            if (typeof (cid) !== "string" || !isCid(cid)) {
                alert("Invalid Video CID!")
                return
            }

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


            getMetadata(cid)
                .then((metadata: any) => {
                    console.log(metadata)
                    setVideoFileCid(cid);
                    setVideoPoster(`https://ipfs.livepeer.com/ipfs/${metadata.image.replace('ipfs://', '')}`);
                    setVideoName(metadata.name)
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
        }

    }, [cid])


    return (
        <>
            <Head>
                <title>SeaTube Watch</title>
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            </Head>
            <Layout>
                <div className='w-full'>
                    <div id="columns" className='w-full flex flex-row mx-auto' style={{ maxWidth: 1280 }}>
                        <div id="primary" className='w-3/4 items-right'>
                            <div className='px-1'>
                                {
                                    (videoFileCid && videoPoster) && <Player cid={videoFileCid} poster={videoPoster} />
                                }
                                <h2 className='text-2xl p-4'>{videoName}</h2>
                            </div>

                            <div className='comments w-2/3'>
                                <div className="flex mx-auto items-center justify-center shadow-lg mt-8 mx-8 mb-4 max-w-lg">
                                    <form className="w-full max-w-xl rounded-lg px-4 pt-2">
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
                                            <div className="w-full md:w-full px-3 mb-2 mt-2">
                                                <textarea className="bg-transparent rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none" name="body" placeholder='Type Your Comment' required></textarea>
                                            </div>
                                            <div className="w-full md:w-full flex items-start md:w-full px-3">
                                                <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                                                    <svg fill="none" className="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <p className="text-xs md:text-sm pt-px">Some HTML is okay.</p>
                                                </div>
                                                <div className="-mr-1">
                                                    <input type='submit' onChange={console.log} className="bg-transparent text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Post Comment' />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>


                        <div id="secondary" className='w-1/4'>
                            {/* Videos */}
                            <div className='px-8 py-2'>
                                {
                                    videosData.map((video, id) => (
                                        <div key={id}>
                                            {getVideo(id)}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                </div>

            </Layout>
        </>
    )
}