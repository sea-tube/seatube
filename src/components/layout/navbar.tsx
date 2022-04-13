import { useState } from "react"
import Avatar from "./avatar"
import Logo from "./logo"
import Menu from "./menu"
import UploadVideo from "./UploadVideo"
import Link from "next/link"

const Navbar = () => {

	const [uploadModal, setUploadModal] = useState<boolean>(false)

	return (
		<nav style={{ height: 56 }}>
			<div className='flex items-center w-full px-6 pl-20 py-1 bg-secondary-color'>
				<Link href={"/"}>
					<a className='md:cursor-default lg:cursor-pointer'>
						<Logo />
					</a>
				</Link>

				<Menu />
				<div className='flex-grow'></div>
				<button onClick={() => setUploadModal(true)}>
					<img src="/images/icons/camera.svg" className="w-18" />
				</button>
				<div className='w-0.5 h-9 bg-gray-600 hidden md:block mx-8'></div>
				<Avatar avatarUrl="https://github.com/random.png" />
			</div>
			<UploadVideo open={uploadModal} onClose={() => setUploadModal(false)} />
		</nav>
	)
}

export default Navbar
