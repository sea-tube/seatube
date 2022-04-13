import Script from "next/script"
import Footer from "./footer"
import Navbar from "./navbar"
import Sidebar from "./sidebar"

const Layout = ({ children, containerBg }: any) => {
	return (
		<>
			<link href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap" rel="stylesheet"></link>
			<div className="bg-primary-color text-white">
				<Navbar />
				<div className='flex'>
					<Sidebar />
					<div className='w-screen sm:pl-24 p-4 containerMinHeight'>
						{children}
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default Layout
