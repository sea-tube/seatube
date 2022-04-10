import LivePeerApi, { prodApiEndpoint } from "./api"
import LivePeerApi2 from "./api2"

const livePeerAPI = new LivePeerApi({ apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY }, prodApiEndpoint)
const livePeerAPI2 = new LivePeerApi2({ apiKey: "" }, prodApiEndpoint)


export const UploadAsset = async (
    file: File, name: string,
    progressCallback?: (progress: number) => void,
    processingCallback?: () => void,
) => {
    const data: any = await livePeerAPI.requestUploadUrl(name)

    const taskId = data.task.id
    const assetId = data.asset.id
    const putUrl = data.url

    await livePeerAPI2.uploadFile(putUrl, file, file.type, (progress: number) => (progressCallback && progressCallback(progress)))

    processingCallback && processingCallback()
    const taskInfo = await livePeerAPI.waitTask({ id: taskId }, (progress: number) => (progressCallback && progressCallback(progress)))

    console.log("Task info", taskInfo)

    const assetInfo = await livePeerAPI.getAsset(assetId)

    console.log(assetInfo)

    return assetInfo
}

export const ExportToIPFS = async (id: string, progressCallback?: (progress: number) => void) => {
    const task = await livePeerAPI.exportAsset(id, { ipfs: {} })
    const taskInfo = await livePeerAPI.waitTask(task.task, (progress: number) => (progressCallback && progressCallback(progress)))
    console.log(taskInfo)
    return taskInfo.output.export.ipfs
}