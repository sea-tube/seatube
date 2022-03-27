import Head from "next/head"
import Layout from "../components/layout"
import Page_header from "../components/layout/page_header"
import { useEffect, useState, useContext } from "react"
import AuthContext from "../contexts/AuthContext"

import { useRouter } from "next/router"

const Account = () => {
	const router = useRouter()
	const { user } = useContext(AuthContext)

	return (
		<>
			<Head>
				<title>SeaTube</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Layout>
				<div className='flex flex-col w-full'>

					<div className="w-full h-60 max-w-7xl bg-secondary-color">

						{/* cover */}
						<div className="w-full h-24 bg-blue-400">

						</div>

						<div className="w-full h-20 px-4 flex">
							<img src="https://github.com/random.png" className="w-24 h-24 -mt-12 rounded-lg" />
							<div className="mx-4 mt-1">
								<div className="text-xl font-bold font-semibold">Random User</div>
								<div className="text-base font-semi-bold">504 Subscribers</div>
							</div>
						</div>

					</div>

					<div className='flex flex-col max-w-7xl'>
						{/* wallet */}
						<div className='w-full max-w-2xl mb-6 border rounded-lg'>
							<div className='px-6 pt-6 pb-2'>
								<div>
									<span className='block text-3xl font-semibold text-gray-500'>
									</span>
									<span className='block text-md'>? USD</span>
								</div>

								<div className='flex flex-1 mt-6'>
									<button className='px-6 py-2 mr-4 uppercase border border-teal-500 rounded-lg hover:bg-teal-100'
										// onClick={() => deposit(1.50)}
									>
										deposit
									</button>
									<button className='px-6 py-2 mr-4 uppercase border border-teal-500 rounded-lg hover:bg-teal-100'>
										withdraw
									</button>
								</div>
							</div>

							<div className='block w-full py-6 pl-6 mt-6 border-t bg-secondary-color'>
								Account: {user?.account}
							</div>
						</div>

					</div>
				</div>
			</Layout>
		</>
	)
}

export default Account
