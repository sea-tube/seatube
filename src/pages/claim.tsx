import Head from "next/head"

import Layout from "../components/layout"
import Page_header from "../components/layout/page_header"

const claim = () => {
	return (
		<>
			<Head>
				<title>SeaTube</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Layout>
				<div className='flex flex-col w-full'>
					<Page_header name='Claim Tokens' breadcrumb='Clain' />
				</div>
			</Layout>
		</>
	)
}
export default claim
