import LivePeerApi from 'services/livePeer/api'

const livePeerAPI = new LivePeerApi(
  { apiKey: process.env.LIVEPEER_API_KEY },
  process.env.NEXT_PUBLIC_LIVEPEER_HOST,
)

export default async (req, res) => {
  if (req.method !== 'POST')
    return res.status(405).send({ message: 'Only POST requests allowed' })
  try {
    const assetId = req.query.assetId
    const assetInfo = await livePeerAPI.getAsset(assetId)
    const task = await livePeerAPI.exportAsset(assetId, {
      ipfs: {
        nftMetadata: {
          description: 'Seatube video transcoded with Livepeer',
          external_url: 'https://sea.tube',
          properties: {
            type: 'mp4',
            size: assetInfo.size,
            duration: assetInfo.videoSpec.duration,
            hash: assetInfo.hash,
            playbackUrl: assetInfo.playbackUrl,
          },
        },
      },
    })
    if (task) {
      res.status(200).json({ ...task })
    } else {
      res.status(500).json({ error: 'Something went wrong' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
