import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from 'components/layout';
import { VideoItem, videosData } from 'components/logic/Videos';
import Player from 'components/Player';
import { isCid } from 'utils/Verify';
import { NewComment } from 'components/Comments';
import Avatar from 'components/layout/avatar';
import { BadgeCheckIcon, BellIcon, DotsHorizontalIcon, EyeIcon, ShareIcon, ShoppingBagIcon, ThumbUpIcon, TrendingUpIcon } from '@heroicons/react/solid'

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
                    console.log(line)
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
                    // loadVideo("/o/playlist.m3u8", "hls")
                    // loadVideo("https://livepeercdn.com/recordings/4b935f10-0352-47ad-9318-85f08dc27b5d/index.m3u8", "hls")
                    // return
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
                            <div>
                                {
                                    (videoPoster && videoType) &&
                                    <Player
                                        source={videoUrl}
                                        poster={videoPoster}
                                        type={videoType}
                                        mediaResolution={{ width: 1024, height: 436 }}
                                    />
                                }

                                <div className='py-2 px-4 sm:px-1'>
                                    <h2 className='text-2xl font-medium break-words py-1'>{videoName}</h2>
                                    <div className='flex flex-wrap items-center justify-between space-y-2 sm:space-y-0 text-sm text-gray-600'>
                                        <div className='flex space-x-4'>
                                            <div className='flex'>
                                                <EyeIcon className='w-5 text-slate-500 mr-1' />
                                                <span>734K Views</span>
                                            </div>
                                            <span className='text-slate-400'>|</span>
                                            <div>
                                                26 Jun 2022
                                            </div>
                                        </div>
                                        <div className='flex space-x-8 mr-12 text-center font-bold'>
                                            <button className='group flex items-center'>
                                                <ThumbUpIcon className='w-8 text-slate-500 group-hover:text-primary mr-1 -mt-2' />
                                                <span>12K</span>
                                            </button>
                                            <button className='group flex items-center'>
                                                <ShareIcon className='w-8 text-slate-500 group-hover:text-primary mr-1' />
                                                <span>Share</span>
                                            </button>
                                            <div className='flex items-center'>
                                                <DotsHorizontalIcon className='w-8 text-slate-400 mr-1' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='py-2'>
                                        <p>
                                            Keep your focus and concentration with this ambient study music to concentrate from Quiet Quest - Study Music...
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-wrap justify-between space-y-2 sm:space-y-0 sm:px-1'>
                                <div className='author bg-white rounded-lg py-2 px-4 ring-1 ring-slate-900/5 w-fit'>
                                    <div className='flex space-x-4 items-center'>
                                        <Avatar url={"https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=128&h=128&q=80"} />
                                        <div>
                                            <div className='flex text-lg font-medium'>Whitney Francis <BadgeCheckIcon className='w-5 text-slate-600' /> </div>
                                            <div className="text-sm text-gray-600">32K Subscribers</div>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-muted"
                                            >
                                                <BellIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                                Subscribe!
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='nft bg-white rounded-lg py-2 px-4 ring-1 ring-slate-900/5 w-fit'>
                                    <div className='flex space-x-4 items-center'>
                                        <Avatar url={"/assets/nft.webp"} />
                                        <div>
                                            <div className='flex text-base font-bold'>You can buy this NFT video!</div>
                                            <div className='flex text-base font-medium'>Last Bid: US$ 120 <TrendingUpIcon className='w-5 text-slate-600' /> <span className="text-sm font-normal ml-1">(24 bids)</span></div>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-muted"
                                            >
                                                <ShoppingBagIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                                Buy!
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='comments my-8 px-4 sm:w-2/3 hidden sm:block'>
                                <NewComment />
                            </div>

                            <div className='w-full border border-gray-200 p-4 my-2 bg-white'>
                                <div className='flex space-x-4 justify-between'>
                                    <span className='font-medium'>134 Comments</span>
                                    <span className='text-sm text-gray-600'>Sort by: <span className='text-primary'>Newest</span></span>
                                </div>
                            </div>

                        </div>


                        <div id="secondary" className='w-full md:w-64 lg:w-80 pt-4 sm:pt-0'>
                            {/* Videos */}
                            <div className='px-2 sm:px-8 flex flex-col items-center'>
                                {
                                    videosData.map((video, id) => (
                                        <div key={id}>
                                            <VideoItem key={id} id={id} />
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