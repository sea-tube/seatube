import LivePeerApi, { prodApiEndpoint } from "../api"

const livePeerAPI = new LivePeerApi({ apiKey: process.env.LIVEPEER_API_KEY }, prodApiEndpoint)

export default async (req, res) => {

    if (req.method !== 'POST') return res.status(405).send({ message: 'Only POST requests allowed' })

    try {
        const body = req.body
        const assetName = body.name
        const response = await livePeerAPI.requestUploadUrl(assetName)
        if (response) {
            console.log(response)
            res.statusCode = 200;
            res.json({ ...response });
        } else {
            res.statusCode = 500;
            res.json({ error: "Something went wrong" });
        }
    } catch (error: any) {
        console.error(error)
        res.statusCode = 500;
        res.json({ error });
    }
}