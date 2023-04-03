import { getMetadata } from "utils/video"

export const listVideos = () => {
    /*
   TODO: Read video NFT from smart contracts.
*/

    // Hardcode for now
    // Currently livepeer do not generate thumbnail, let's use a custom 
    const data = {
        QmPihzXtXcWRg1sSqrRZKqMGWg53Gmzra2UreK9UkPdiYe: {
            image:
                'https://bafybeieyckjdextaw2yfxo3r2qil37xluwayjz4n7dekuutbzaxxelanw4.ipfs.dweb.link/poster.jpg',
            duration: 888.064
        },
        bafkreieqh5o34u3mreoeugwaz3ajlmdw6auznlr5t4a2pwcskz2tghth5u: {
            image:
                'https://bafkreiejqloiivw5tmnqhcdx6ubwji4kdmmujd5g333kiaf3jfwj36qgha.ipfs.nftstorage.link/',
            duration: 634.534
        },
        bafkreihj6lfwbyfwayhyzkiqp6zsybknzwzo46omymupffr5s3263msf6u: {
            image: 'https://i.ytimg.com/vi/94HH5D23WWI/mqdefault.jpg',
            duration: 695.04
        },
    }

    return Promise.all(
        Object.keys(data).map(async (cid) => {
            const metadata = await getMetadata(cid)
            return {
                metadataCid: cid,
                videoCid: metadata.properties.video.split("ipfs://")[1],
                metadata: {
                    ...metadata,
                    image: data[cid].image,
                    properties: {
                        duration: data[cid].duration,
                        thumbs: '/thumbs.png'
                    }
                },
            }
        }),
    )
}