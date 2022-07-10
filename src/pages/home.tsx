import { useContext, useEffect } from "react"
import Head from "next/head"
import { useState } from "react"
import Layout from "../components/layout"
import AuthContext from "../contexts/AuthContext"
import { getVideo, videosData } from "../components/logic/Videos"

const Home = () => {

	const [activeTab, setActiveTab] = useState("player")
	const { user } = useContext(AuthContext)

	return (
		<>
			<Head>
				<title>SeaTube</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Layout>
				<div className='flex flex-col w-full'>

					{/* Categories */}
					<ul className='flex pl-0 mx-2 mb-4 list-none border-b-0 lg:justify-start overflow-x-auto overflow-hidden'>
						<li className='nav-item'>
							<button
								className={`block px-6 py-3 my-2 border-b-4 border-transparent text-xs font-medium leading-tight uppercase  hover:bg-secondary-color ${activeTab === "player"
									? " border-teal-400 font-bold text-teal-600"
									: ""
									}`}
								onClick={() => setActiveTab("player")}>
								Crypto
							</button>
						</li>
						<li className='nav-item'>
							<button
								className={`block px-6 py-3 my-2 border-b-4 border-transparent text-xs font-medium leading-tight uppercase  hover:bg-secondary-color ${activeTab === "azul"
									? " border-teal-400 font-bold text-teal-600"
									: ""
									}`}
								onClick={() => setActiveTab("azul")}>
								Technology
							</button>
						</li>
						<li className='nav-item'>
							<button
								className={`block px-6 py-3 my-2 border-b-4 border-transparent text-xs font-medium leading-tight uppercase  hover:bg-secondary-color ${activeTab === "verde"
									? " border-teal-400 font-bold text-teal-600"
									: ""
									}`}
								onClick={() => setActiveTab("verde")}>
								Music
							</button>
						</li>
						<li className='nav-item'>
							<button
								className={`block px-6 py-3 my-2 border-b-4 border-transparent text-xs font-medium leading-tight uppercase  hover:bg-secondary-color ${activeTab === "amarelo" ? " border-teal-400 font-bold" : ""
									}`}
								onClick={() => setActiveTab("amarelo")}>
								Humor
							</button>
						</li>
						<li className='nav-item'>
							<button
								className={`block px-6 py-3 my-2 border-b-4 border-transparent text-xs font-medium leading-tight uppercase  hover:bg-secondary-color ${activeTab === "amarelo" ? " border-teal-400 font-bold" : ""
									}`}
								onClick={() => setActiveTab("amarelo")}>
								Politics
							</button>
						</li>
					</ul>

					{/* Videos */}
					<div className="w-full flex flex-wrap justify-center sm:justify-start">
						{
							videosData.map((video, id) => (
								<div key={id}>
									{getVideo(id)}
								</div>
							))
						}
					</div>

				</div>
			</Layout>
		</>
	)
}

export default Home
