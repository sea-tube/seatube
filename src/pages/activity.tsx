import Head from "next/head"
import { useRouter } from "next/router"
import Layout from "../components/layout"
import Page_header from "../components/layout/page_header"
import Svg from "../components/layout/svg"

const activity = () => {
	return (
		<>
			<Head>
				<title>SeaTube</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Layout>
				<div className='flex flex-col w-full'>
					<Page_header name='Activity' breadcrumb='Activity' />

					<div className='flex flex-col max-w-7xl'>
						{/* box */}
						<div className='flex items-center justify-between p-4 mb-2 border rounded-lg'>
							<div className='flex '>
								<span className='text-sm font-medium tracking-wider text-gray-400'>
									You claimed 55{" "}
								</span>
								<div className='w-6 h-6 mx-1 bg-primary-dark-400 rounded-full'></div>
								<span className='text-sm font-medium tracking-wider text-gray-400'>
									to wallet{" "}
									<span className='hidden font-semibold text-primary-dark-400 xl:inline-block text-md'>
										0xe4385b6b8a911Cdd07D21Fee56B3B4327A3caBf2
									</span>
									<span className='font-semibold text-primary-dark-400 xl:hidden text-md'>
										0xe4385b6b811Cdd...
									</span>
								</span>
							</div>
							<div className=''>
								<span className='text-sm font-medium tracking-wider text-gray-400'>
									{new Date().toLocaleString("en-US", {
										day: "numeric", // numeric, 2-digit
										year: "numeric", // numeric, 2-digit
										month: "short", // numeric, 2-digit, long, short, narrow
										hour: "numeric", // numeric, 2-digit
										minute: "numeric", // numeric, 2-digit
									})}
								</span>
							</div>
						</div>

						{/* box */}
						<div className='flex items-center justify-between p-4 mb-2 border rounded-lg'>
							<div className='flex '>
								<span className='text-sm font-medium tracking-wider text-gray-400'>
									You claimed 55{" "}
								</span>
								<div className='w-6 h-6 mx-1 bg-primary-dark-400 rounded-full'></div>
								<span className='text-sm font-medium tracking-wider text-gray-400'>
									to wallet{" "}
									<span className='hidden font-semibold text-primary-dark-400 xl:inline-block text-md'>
										0xe4385b6b8a911Cdd07D21Fee56B3B4327A3caBf2
									</span>
									<span className='font-semibold text-primary-dark-400 xl:hidden text-md'>
										0xe4385b6b811Cdd...
									</span>
								</span>
							</div>
							<div className=''>
								<span className='text-sm font-medium tracking-wider text-gray-400'>
									{new Date().toLocaleString("en-US", {
										day: "numeric", // numeric, 2-digit
										year: "numeric", // numeric, 2-digit
										month: "short", // numeric, 2-digit, long, short, narrow
										hour: "numeric", // numeric, 2-digit
										minute: "numeric", // numeric, 2-digit
									})}
								</span>
							</div>
						</div>

						{/* box */}
						<div className='flex items-center justify-between p-4 mb-2 border rounded-lg'>
							<div className='flex '>
								<span className='text-sm font-medium tracking-wider text-gray-400'>
									You claimed 55{" "}
								</span>
								<div className='w-6 h-6 mx-1 bg-primary-dark-400 rounded-full'></div>
								<span className='text-sm font-medium tracking-wider text-gray-400'>
									to wallet{" "}
									<span className='hidden font-semibold text-primary-dark-400 xl:inline-block text-md'>
										0xe4385b6b8a911Cdd07D21Fee56B3B4327A3caBf2
									</span>
									<span className='font-semibold text-primary-dark-400 xl:hidden text-md'>
										0xe4385b6b811Cdd...
									</span>
								</span>
							</div>
							<div className=''>
								<span className='text-sm font-medium tracking-wider text-gray-400'>
									{new Date().toLocaleString("en-US", {
										day: "numeric", // numeric, 2-digit
										year: "numeric", // numeric, 2-digit
										month: "short", // numeric, 2-digit, long, short, narrow
										hour: "numeric", // numeric, 2-digit
										minute: "numeric", // numeric, 2-digit
									})}
								</span>
							</div>
						</div>
					</div>

					{/* footerList */}
					<div className='sticky bottom-0 right-0 items-center w-full py-4 mt-4 bg-white border-gray-200 max-w-7xl sm:flex sm:justify-between'>
						<div className='flex items-center mb-4 sm:mb-0'>
							<span className='text-sm font-normal text-gray-500'>
								Showing{" "}
								<span className='font-semibold text-gray-900'>1-20</span> of{" "}
								<span className='font-semibold text-gray-900'>2290</span>
							</span>
						</div>
						<div className='flex items-center space-x-3'>
							<a
								href='#'
								className='inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white bg-primary-dark-400 rounded-lg hover:bg-primary-dark-500 focus:ring-4 focus:ring-cyan-200'>
								<Svg classe='-ml-1 mr-1 h-5 w-5' icon='left_arrow_bold' />
								Previous
							</a>
							<a
								href='#'
								className='inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white bg-primary-dark-400 rounded-lg hover:bg-primary-dark-500 focus:ring-4 focus:ring-cyan-200'>
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

export default activity
