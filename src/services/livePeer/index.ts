import LivePeerApi from "./api"

const localLivePeerAPI = new LivePeerApi({ apiKey: "" }, "/")
const remoteLivePeerAPI = new LivePeerApi({ apiKey: "" }, process.env.NEXT_PUBLIC_LIVEPEER_HOST)

export const UploadAsset = async (
    file: File, name: string,
    progressCallback?: (progress: number) => void,
    processingCallback?: () => void,
) => {
    const data: any = await localLivePeerAPI.requestUploadUrl(name)

    const taskId = data.task.id
    const assetId = data.asset.id
    const putUrl = data.url

    await remoteLivePeerAPI.uploadFile(putUrl, file, file.type, (progress: number) => (progressCallback && progressCallback(progress)))

    processingCallback && processingCallback()
    const taskInfo = await localLivePeerAPI.waitTask({ id: taskId }, (progress: number) => (progressCallback && progressCallback(progress)))

    console.log("Task info", taskInfo)

    const assetInfo = await localLivePeerAPI.getAsset(assetId)

    console.log(assetInfo)

    return assetInfo
}

export const ExportToIPFS = async (id: string, progressCallback?: (progress: number) => void) => {
    const task = await localLivePeerAPI.exportAsset(id, { ipfs: {} })
    const taskInfo = await localLivePeerAPI.waitTask(task.task, (progress: number) => (progressCallback && progressCallback(progress)))
    console.log(taskInfo)
    return taskInfo.output.export.ipfs
}