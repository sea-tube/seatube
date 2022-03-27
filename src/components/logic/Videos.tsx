import { EyeIcon } from "@heroicons/react/solid"
import Link from "next/link"

export const videosData = [
	{
		name: "Sintel | Sample Encoded Video",
		poster: "https://bafybeieyckjdextaw2yfxo3r2qil37xluwayjz4n7dekuutbzaxxelanw4.ipfs.dweb.link/poster.jpg",
	},
	{
		name: "Big Buck Bunny 60fps 4K",
		poster: "https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
	},
	{
		name: "Tool",
		poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7bsWdDEcibT25zEZxp0lfUXCqp9bY_0sUqw&usqp=CAU",
	},
	{
		name: "QOTSA | Infinity",
		poster: "https://external-preview.redd.it/FTdWnT8epoSl4EtHXM9Z0dy83rgWFTTn9l33uxsDo9Q.jpg?auto=webp&s=98c0d44560441d081fd49f4f2ce89cd72ea8eade",
	},
	{
		name: "Carousel by Mr Bungle",
		poster: "https://m.media-amazon.com/images/I/91e36dD6knL._AC_SX425_.jpg",
	},
	{
		name: "Immigrant Song - Led Zeppelin",
		poster: "https://m.media-amazon.com/images/I/81g+SqwTwLL._AC_SL1500_.jpg",
	},
	{
		name: "Rammstein - Zerstören",
		poster: "https://images.alphacoders.com/693/thumb-1920-693591.jpg",
	},
	{
		name: "DOUBLE KING",
		poster: "https://i.ytimg.com/vi/w_MSFkZHNi4/maxresdefault.jpg",
		author: "Felix Colgrave"
	}
]

export const getVideo = (id) => {
	console.log(id)
	return (
		<div className="w-64 mx-4 mb-8 hover:text-gray-300 cursor-pointer relative" key={id}>
			<Link href={`/watch/${id}`}>
				<a>
					<div className="w-full h-36 bg-black flex justify-center rounded">
						<img src={videosData[id].poster}
							className="object-contain" />
					</div>

					<div className="w-full h-36 flex justify-center items-center rounded absolute left-0 top-0 bg-black opacity-0 hover:opacity-60">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 20 20" stroke="url(#grad1)">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
							<defs>
								<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
									<stop offset="0%" stop-color="#4ADE80" stopOpacity="1" />
									<stop offset="50%" stop-color="#22D3EE" stopOpacity="1" />
								</linearGradient>
							</defs>I
						</svg>
					</div>
					<div className="mt-1 px-2">
						<div className="text-xl dm-sans">{videosData[id].name}</div>
						<div className="text-sm dm-sans">Tester Sea | 4.3K <EyeIcon className="w-3 inline mb-1 text-gray-400" /></div>
					</div>
				</a>
			</Link>
		</div>
	)
}