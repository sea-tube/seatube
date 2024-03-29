import Head from "next/head"
import Layout from "../components/layout"
import Svg from "../components/layout/svg"
import { ShieldCheckIcon, ShieldExclamationIcon, ThumbUpIcon, UserRemoveIcon } from '@heroicons/react/solid'
import { useContext, useState } from "react"
import WalletContext from "../contexts/WalletContext"
import { TrendingUpIcon } from "@heroicons/react/outline"

const data = require("../data/moderation.json")

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
								className={`block px-6 py-3 my-2 border-b-4 border-transparent text-xs font-medium leading-tight uppercase hover:bg-primary-light ${activeTab === "player"
									? " border-primary-dark-400 font-bold text-primary-dark-600"
									: ""
									}`}
								onClick={() => setActiveTab("activeModerators")}
							>
								Active Moderators
							</button>
						</li>
						<li className='nav-item'>
							<button
								className={`block px-6 py-3 my-2 border-b-4 border-transparent text-xs font-medium leading-tight uppercase hover:bg-primary-light ${activeTab === "player"
									? " border-primary-dark-400 font-bold text-primary-dark-600"
									: ""
									}`}
								onClick={() => setActiveTab("pendingModerators")}
							>
								Pending Moderators
							</button>
						</li>
						<li className='nav-item'>
							<button
								className={`block px-6 py-3 my-2 border-b-4 border-transparent text-xs font-medium leading-tight uppercase hover:bg-primary-light ${activeTab === "azul"
									? " border-primary-dark-400 font-bold text-primary-dark-600"
									: ""
									}`}
								onClick={() => setActiveTab("videosModeration")}>
								Videos Moderation
							</button>
						</li>
						<li className='nav-item'>
							<button
								className={`block px-6 py-3 my-2 border-b-4 border-transparent text-xs font-medium leading-tight uppercase hover:bg-primary-light ${activeTab === "azul"
									? " border-primary-dark-400 font-bold text-primary-dark-600"
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

								data.moderators.active.map((moderator, id) =>

									<div className='flex items-center justify-between pr-4 mb-4rounded-lg' key={id}>
										<div className="w-80 hover:text-gray-300 cursor-pointer relative">
											<div className="w-full h-40 bg-black flex justify-center rounded">
												<img src={moderator.avatar}
													className="h-full" />
											</div>
											<div className="w-full h-40 flex justify-center rounded absolute left-0 top-0 bg-black opacity-0 hover:opacity-50">
											</div>
										</div>
										<div className="ml-2 px-2">
											<div className="text-xl ">{moderator.name}</div>
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

								data.moderators.pending.map((moderator, id) =>

									<div className='flex items-center justify-between pr-4 mb-4 bg-background rounded-lg' key={id}>
										<div className="w-80 hover:text-gray-300 cursor-pointer relative">
											<div className="w-full h-40 bg-black flex justify-center rounded">
												<img src={moderator.avatar}
													className="h-full" />
											</div>
											<div className="w-full h-40 flex justify-center rounded absolute left-0 top-0 bg-black opacity-0 hover:opacity-50">
											</div>
										</div>
										<div className="ml-2 px-2">
											<div className="text-xl ">{moderator.name}</div>
											<div className=''>
												{showTime()}
											</div>
										</div>
										<div className="ml-2 px-2">
											<div>
												<button className="w-24 text-lg text-center  bg-green-400 rounded-lg"
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

								data.videos.map((video, id) =>

									<div key={id} className='flex items-center justify-between pr-4 mb-4 bg-background rounded-lg relative'>
										<div className="w-80 hover:text-gray-300 cursor-pointer relative">
											<div className="w-full h-40 bg-black flex justify-center rounded">
												<img src={video.poster}
													className="h-full" />
											</div>
											<div className="w-full h-40 flex justify-center rounded absolute left-0 top-0 bg-black opacity-0 hover:opacity-50">
											</div>
										</div>
										<div className="ml-2 px-2">
											<div className="text-xl ">{video.name}</div>
											<div className="text-sm ">Author Name</div>
											<div className=''>
												{showTime()}
											</div>
										</div>
										<div className="ml-2 px-2">
											<div className="flex space-x-6">
												<button className="w-24 text-lg text-center  bg-red-400 hover:bg-red-500 rounded-lg"
													onClick={() => signMessage(video.name)}
												>
													<ShieldExclamationIcon className="w-8 m-auto" />
													Deny
												</button>
												<button className="w-24 text-lg text-center  bg-green-400 hover:bg-green-500 rounded-lg"
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
											<button className="w-full flex justify-center items-center mt-4 text-lg text-center  bg-red-500 hover:bg-red-600 rounded">
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
								className='w-32 inline-flex items-center justify-center flex-1 px-2 py-2 text-sm font-medium text-center text-white bg-primary-dark-400 rounded-lg hover:bg-primary-dark-500 focus:ring-4 focus:ring-cyan-200'>
								<Svg classe='-ml-1 mr-1 h-5 w-5' icon='left_arrow_bold' />
								Previous
							</a>
							<a
								href='#'
								className='w-32 inline-flex items-center justify-center flex-1 px-2 py-2 text-sm font-medium text-center text-white bg-primary-dark-400 rounded-lg hover:bg-primary-dark-500 focus:ring-4 focus:ring-cyan-200'>
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