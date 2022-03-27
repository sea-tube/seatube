import { NFTStorage, File } from 'nft.storage'

const NFT_STORAGE_API_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY || ""

const uploadToIPFS = async (file, name, description) => {
    const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })

    const metadata = await client.store({
        name,
        description,
        video: {
            poster: "",
            thumbs: "",

        },
        image: file
        // image: new File([/* data */], filename, { type })
    })
    console.log(metadata)
}

export default uploadToIPFS