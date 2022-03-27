import Head from "next/head"
import { useRouter } from "next/router"
import Layout from "../components/layout"
import Page_header from "../components/layout/page_header"
import Svg from "../components/layout/svg"
import { ShieldCheckIcon, ShieldExclamationIcon, SpeakerphoneIcon, ThumbUpIcon, UserRemoveIcon } from '@heroicons/react/solid'
import { useContext, useState } from "react"
import WalletContext from "../contexts/WalletContext"
import { TrendingUpIcon } from "@heroicons/react/outline"

const videosData = [
	{
		name: "Sintel | Sample Encoded Video",
		poster: "https://bafybeieyckjdextaw2yfxo3r2qil37xluwayjz4n7dekuutbzaxxelanw4.ipfs.dweb.link/poster.jpg",
	},
	{
		name: "Big Buck Bunny 60fps 4K",
		poster: "https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
		duration: 634.500
	},
	{
		name: "Adult Content Sample 001 240p",
		poster: "https://media.threatpost.com/wp-content/uploads/sites/103/2019/07/19153723/Adult.jpg",
		duration: 1037.8
	},
	{
		name: "Queens of The Stone Age",
		poster: "https://qotsa.com/wp-content/themes/qotsa/assets/img/img_share-img.jpg",
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
		name: "Dragula | Rob Zombie",
		poster: "https://m.media-amazon.com/images/I/81bPrUAESnL._AC_SX425_.jpg",
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

const moderatorsData = {
	active: [
		{
			name: "Anarkrypto",
			avatar: "https://github.com/anarkrypto.png"
		},
		{
			name: "Akita On Rails",
			avatar: "https://github.com/akitaonrails.png"
		}
	],
	pending: [
		{
			name: "John Smith",
			avatar: "https://github.com/john.png",
			votesPercentage: 0
		},
		{
			name: "Mr Bot",
			avatar: "https://github.com/mrbot.png",
			votesPercentage: 2
		},
		{
			name: "Linus Torvalds",
			avatar: "https://github.com/linustorvalds.png",
			votesPercentage: 6
		},
		{
			name: "Satoshi Nakamoto",
			avatar: "https://github.com/satoshinakamoto.png",
			votesPercentage: 11
		}
	]
}

const showTime = () => {
	return (
		<span className='text-sm font-medium tracking-wider text-gray-400'>
			{new Date().toLocaleString("en-US", {
				day: "numeric", // numeric, 2-digit
				year: "numeric", // numeric, 2-digit
				month: "short", // numeric, 2-digit, long, short, narrow
				hour: "numeric", // numeric, 2-digit
				minute: "numeric", // numeric, 2-digit
			})}
		</span>
	)
}

const returnFlag = (frame, duration) => {

	const position = 100 / (duration / Number(frame.timeOffset.replace('s', '')))
	console.log(position)

	switch (frame.pornographyLikelihood) {
		case "POSSIBLE":
			return <div key={frame.timeOffset} className="bg-yellow-300 w-1 h-8 absolute -top-2 rounded" style={{
				left: `${position}%`
			}}></div>
		case "LIKELY":
			return <div key={frame.timeOffset} className="bg-orange-500 w-1 h-8 absolute -top-2" style={{
				left: `${position}%`
			}}></div>
		case "VERY_LIKELY":
			return <div key={frame.timeOffset} className="bg-red-600 w-1 h-8 absolute -top-2" style={{
				left: `${position}%`
			}}></div>
		default:
			return <div key={frame.timeOffset} className="bg-green-200/10 w-1 h-4 absolute top-0" style={{
				left: `${position}%`
			}}></div>
	}
}

const Moderation = () => {
	const { signMessage, signAsHash } = useContext(WalletContext)
	const [activeTab, setActiveTab] = useState("moderators")

	return (
		<>
			<Head>
				<title>SeaTube</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Layout containerBg="bg-transparent">
				<div className='flex flex-col w-full'>

					{/* Categories */}
					<ul className='flex flex-row flex-wrap pl-0 mb-4 list-none border-b-0 nav nav-tabs md:flex-row'>
						<li className='nav-item'>
							<button
								className={`block px-6 py-3 my-2 border-b-4 border-transparent text-xs font-medium leading-tight uppercase hover:bg-secondary-color ${activeTab === "player"
									? " border-teal-400 font-bold text-teal-600"
									: ""
									}`}
								onClick={() => setActiveTab("activeModerators")}
							>
								Active Moderators
							</button>
						</li>
						<li className='nav-item'>
							<button
								className={`block px-6 py-3 my-2 border-b-4 border-transparent text-xs font-medium leading-tight uppercase hover:bg-secondary-color ${activeTab === "player"
									? " border-teal-400 font-bold text-teal-600"
									: ""
									}`}
								onClick={() => setActiveTab("pendingModerators")}
							>
								Pending Moderators
							</button>
						</li>
						<li className='nav-item'>
							<button
								className={`block px-6 py-3 my-2 border-b-4 border-transparent text-xs font-medium leading-tight uppercase hover:bg-secondary-color ${activeTab === "azul"
									? " border-teal-400 font-bold text-teal-600"
									: ""
									}`}
								onClick={() => setActiveTab("videosModeration")}>
								Videos Moderation
							</button>
						</li>
						<li className='nav-item'>
							<button
								className={`block px-6 py-3 my-2 border-b-4 border-transparent text-xs font-medium leading-tight uppercase hover:bg-secondary-color ${activeTab === "azul"
									? " border-teal-400 font-bold text-teal-600"
									: ""
									}`}
								onClick={() => alert("confirm you accept the terms")}>
								Apply as Moderator
							</button>
						</li>
					</ul>

					{

						activeTab == "activeModerators" &&

						<div className='flex flex-col max-w-7xl'>

							{

								moderatorsData.active.map((moderator, id) =>

									<div className='flex items-center justify-between pr-4 mb-4 bg-primary-color rounded-lg'>
										<div className="w-80 hover:text-gray-300 cursor-pointer relative">
											<div className="w-full h-40 bg-black flex justify-center rounded">
												<img src={moderator.avatar}
													className="h-full" />
											</div>
											<div className="w-full h-40 flex justify-center rounded absolute left-0 top-0 bg-black opacity-0 hover:opacity-50">
											</div>
										</div>
										<div className="ml-2 px-2">
											<div className="text-xl dm-sans">{moderator.name}</div>
											<div className=''>
												{showTime()}
											</div>
										</div>
										<div className="ml-2 px-2">
											<TrendingUpIcon className="w-12 text-green-400" />
										</div>
									</div>

								)
							}


						</div>

					}

					{

						activeTab == "pendingModerators" &&

						<div className='flex flex-col max-w-7xl'>

							{

								moderatorsData.pending.map((moderator, id) =>

									<div className='flex items-center justify-between pr-4 mb-4 bg-primary-color rounded-lg'>
										<div className="w-80 hover:text-gray-300 cursor-pointer relative">
											<div className="w-full h-40 bg-black flex justify-center rounded">
												<img src={moderator.avatar}
													className="h-full" />
											</div>
											<div className="w-full h-40 flex justify-center rounded absolute left-0 top-0 bg-black opacity-0 hover:opacity-50">
											</div>
										</div>
										<div className="ml-2 px-2">
											<div className="text-xl dm-sans">{moderator.name}</div>
											<div className=''>
												{showTime()}
											</div>
										</div>
										<div className="ml-2 px-2">
											<div>
												<button className="w-24 text-lg text-center dm-sans bg-green-400 rounded-lg"
													onClick={() => {
														signAsHash(["string"], ["abc123"])
															.then(console.info)
															.catch(alert)
													}}
												>
													<ThumbUpIcon className="w-10 m-auto" />
													Vote
												</button>
											</div>
											<div className="mt-4 text-2xl text-center">{moderator.votesPercentage}%</div>
										</div>
									</div>

								)
							}


						</div>

					}

					{
						activeTab == "videosModeration" &&
						<div className='flex flex-col max-w-7xl'>

							{

								videosData.map((video, id) =>

									<div key={id} className='flex items-center justify-between pr-4 mb-4 bg-primary-color rounded-lg relative'>
										<div className="w-80 hover:text-gray-300 cursor-pointer relative">
											<div className="w-full h-40 bg-black flex justify-center rounded">
												<img src={video.poster}
													className="h-full" />
											</div>
											<div className="w-full h-40 flex justify-center rounded absolute left-0 top-0 bg-black opacity-0 hover:opacity-50">
											</div>
										</div>
										<div className="ml-2 px-2">
											<div className="text-xl dm-sans">{video.name}</div>
											<div className="text-sm dm-sans">Author Name</div>
											<div className=''>
												{showTime()}
											</div>
										</div>
										<div className="ml-2 px-2">
											<div className="flex space-x-6">
												<button className="w-24 text-lg text-center dm-sans bg-red-400 hover:bg-red-500 rounded-lg"
													onClick={() => signMessage(video.name)}
												>
													<ShieldExclamationIcon className="w-8 m-auto" />
													Deny
												</button>
												<button className="w-24 text-lg text-center dm-sans bg-green-400 hover:bg-green-500 rounded-lg"
													onClick={() => {
														signAsHash(["string"], ["abc123"])
															.then(console.info)
															.catch(alert)
													}}
												>
													<ShieldCheckIcon className="w-8 m-auto" />
													Approve
												</button>
											</div>
											<button className="w-full flex justify-center items-center mt-4 text-lg text-center dm-sans bg-red-500 hover:bg-red-600 rounded">
												Ban Account
												<UserRemoveIcon className="w-4 ml-2" />
											</button>
										</div>
										{/* {
											"explicit" in video &&
											<div className="absolute bottom-0 left-0 w-full h-4 bg-white/10">
												{
													video.explicit?.annotationResults[0].explicitAnnotation.frames.map((frame, id) =>
														returnFlag(frame, video.duration)
													)
												}
											</div>
										} */}
									</div>

								)
							}


						</div>
					}

					{/* footerList */}
					<div className='bottom-0 right-0 items-center w-full py-4 mt-4 px-4 border-gray-200 max-w-7xl sm:flex sm:justify-between text-white'>
						<div className='flex items-center mb-4 sm:mb-0'>
							<span className='text-sm font-normal text-gray-100'>
								Showing{" "}
								<span className='font-semibold text-white'>1-20</span> of{" "}
								<span className='font-semibold text-white'>2290</span>
							</span>
						</div>
						<div className='flex items-center space-x-4'>
							<a
								href='#'
								className='w-32 inline-flex items-center justify-center flex-1 px-2 py-2 text-sm font-medium text-center text-white bg-teal-400 rounded-lg hover:bg-teal-500 focus:ring-4 focus:ring-cyan-200'>
								<Svg classe='-ml-1 mr-1 h-5 w-5' icon='left_arrow_bold' />
								Previous
							</a>
							<a
								href='#'
								className='w-32 inline-flex items-center justify-center flex-1 px-2 py-2 text-sm font-medium text-center text-white bg-teal-400 rounded-lg hover:bg-teal-500 focus:ring-4 focus:ring-cyan-200'>
								Next
								<Svg classe='-mr-1 ml-1 h-5 w-5' icon='right_arrow_bold' />
							</a>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Moderation