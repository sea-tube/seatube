import Head from "next/head"
import Footer from "./footer"
import Navbar from "./navbar"
import Sidebar from "./sidebar"

const Layout = ({ children, containerBg }: any) => {
	return (
		<>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
			</Head>
			<div className="bg-background-muted text-slate-800font-inter inter">
				<Navbar />
				<Sidebar />
				<div className='w-screen sm:pl-24 sm:p-4 containerMinHeight' style={{
					marginTop: 56 // Navbar height
				}}>
					{children}
				</div>
				<Footer />
			</div>
		</>
	)
}

export default Layout
