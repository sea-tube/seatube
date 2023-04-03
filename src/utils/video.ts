export const customManifestSources = async (videoCID: string) => {
    const url = `https://${videoCID}.ipfs.dweb.link/output_custom.m3u8`
    const response = await fetch(url)
    const m3u8 = await response.text()
    const m3u8Arr = m3u8.split('\n')
    const m3u8NewArr: string[] = []
    m3u8Arr.forEach((line) => {
        m3u8NewArr.push(
            line.replace(
                'output_custom',
                `https://${videoCID}.ipfs.dweb.link/output_custom`,
            ),
        )
    })
    const enc = new TextEncoder()
    return URL.createObjectURL(new Blob([enc.encode(m3u8NewArr.join('\n'))]))
}

export const getMetadata = async (cid: string) => {
    const response = await fetch(`https://ipfs.livepeer.com/ipfs/${cid}`)
    const metadata = await response.json()
    return metadata
}

export const getUrlGateway = (cid: string) => {
    return `https://ipfs.livepeer.com/ipfs/${cid}`
}