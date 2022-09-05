import { EyeIcon } from "@heroicons/react/solid"
import Link from "next/link"

// id,
// name: video.name,
// description: video.description,
// channel: video.channel,
// thumbnail: video.thumbnail,
// views: video.views,
// timestamp: video.timestamp

export const videosData = require("../../data/videos.json");

export function VideoItem ({ id }: { id: string }) {
	return (
		<div className="w-80 md:w-56 lg:w-64 mx-4 mb-8 text-gray-600 cursor-pointer font-medium" key={videosData[id].nftMetadataCid}>
			<Link href={`/watch/${videosData[id].nftMetadataCid}`}>
				<a>
					<div className="w-full h-auto bg-black flex justify-center rounded relative">
						<img src={videosData[id].poster}
							className="object-contain rounded" />

						<div className="w-full h-full flex justify-center items-center rounded absolute left-0 top-0 bg-black/60 opacity-0 hover:opacity-100" />
					</div>

					<div className="mt-1 px-2">
						<div className="text-base leading-5 break-words max-w-full">{videosData[id].name}</div>
						<div className="text-xs flex space-x-6 text-gray-500">
							<div>Tester Sea</div>
							<div className="flex items-center">4.3K <EyeIcon className="w-3 ml-1 text-gray-500" /></div>
						</div>
					</div>
				</a>
			</Link>
		</div>
	)
}