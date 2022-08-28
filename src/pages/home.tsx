import { useContext, useEffect } from "react"
import Head from "next/head"
import { useState } from "react"
import Layout from "../components/layout"
import AuthContext from "../contexts/AuthContext"
import { getVideo, videosData } from "../components/logic/Videos"
import Categories from "components/Categories"

const Home = () => {

	const { user } = useContext(AuthContext)

	return (
		<>
			<Head>
				<title>SeaTube</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Layout>
				<div className='flex flex-col w-full'>

					<div className="sticky bg-gray-50 z-20 mb-4" style={{
						top: 65,
					}}>
						<Categories categories={
							[
								"All",
								"Crypto",
								"Music",
								"Tech",
								"Art",
								"Sports",
								"News",
								"Humor",
								"Science",
								"Education",
								"Politics",
								"Entertainment",
								"Travel",
								"Food",
								"Games",
								"Other"
							]
						} defaultValue="All" />
					</div>

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
