import LivePeerApi, { prodApiEndpoint } from "./api"

const livePeerAPI = new LivePeerApi({ apiKey: "4a54a5ad-0de9-4bd0-9404-8724b7351ee1" }, prodApiEndpoint)

export const UploadAsset = async (
    file: File, name: string,
    progressCallback?: (progress: number) => void,
    processingCallback?: () => void,
) => {
    const data: any = await livePeerAPI.requestUploadUrl(name)

    const taskId = data.task.id
    const assetId = data.asset.id
    const putUrl = data.url

    await livePeerAPI.uploadFile(putUrl, file, file.type, (progress: number) => (progressCallback && progressCallback(progress)))

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