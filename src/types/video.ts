export interface NftMetadata {
    name: string
    description: string
    image: string
    properties?: Record<string, any>
}

export interface VideoMetadata extends NftMetadata {
    properties: {
        type: string
        duration: number
        size: number
        thumbs: string
        playbackUrl: string
        hash: {
            hash: string
            algorith: string
        }[]
    }
}

export interface VideoProperties {
    metadataCid: string;
    videoCid: string
    metadata: VideoMetadata
}