import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from 'components/layout'
import { getVideo, videosData } from 'components/logic/Videos'
import Player from 'components/Player'
import { isCid } from 'utils/Verify'
import { NewComment } from 'components/Comments'

export default function Watch() {

    const router = useRouter()

    const { cid } = router.query;

    const [videoName, setVideoName] = useState<string | null>(null);
    const [videoPoster, setVideoPoster] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [videoType, setVideoType] = useState<string | null>(null);

    useEffect(() => {

        if (cid) {
            

            if (typeof (cid) !== "string" || !isCid(cid)) {
                alert("Invalid Video CID!")
                return
            }

            const loadVideo = (url: string, type: string) => {
                console.log("loading:,", url, type)
                setVideoUrl(url);
                setVideoType(type);
            };

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
                    <div id="columns" className='w-full flex flex-col md:flex-row mx-auto' style={{ maxWidth: 1280 }}>
                        <div id="primary" className='w-full md:w-3/4 sm:items-right'>
                            <div className='px-1'>
                                {
                                    (videoPoster && videoType) &&
                                        <Player source={videoUrl} poster={videoPoster} type={videoType} />
                                }
                                <h2 className='text-2xl p-4 break-words'>{videoName}</h2>
                            </div>

                            <div className='comments m-6 sm:w-2/3'>
                                <NewComment />
                            </div>
                        </div>


                        <div id="secondary" className='w-full md:w-64 lg:w-80'>
                            {/* Videos */}
                            <div className='px-2 sm:px-8 py-2 flex flex-col items-center'>
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