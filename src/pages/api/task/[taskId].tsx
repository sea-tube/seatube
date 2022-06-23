import LivePeerApi from "services/livePeer/api";

const livePeerAPI = new LivePeerApi({ apiKey: process.env.LIVEPEER_API_KEY }, process.env.NEXT_PUBLIC_LIVEPEER_HOST)

export default async (req, res) => {
    const taskId = req.query.taskId;
    try {
        const taskInfo = await livePeerAPI.getTask(taskId)
        if (taskInfo) {
            res.statusCode = 200;
            res.json({ ...taskInfo });
          } else {
            res.statusCode = 500;
            res.json({ error: "Something went wrong" });
          }
    } catch (error: any) {
        res.statusCode = 500;
        res.json({ error });
    }
}