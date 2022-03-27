import Link from "next/link"
import Image from "next/image"
import { GiftIcon, HomeIcon } from "@heroicons/react/outline"

const menu = () => {
	return (
		<div className='hidden mx-4 lg:flex text-white'>
			<Link href={"/home"}>
				<a href='' className='flex items-center mx-4 hover:cursor-pointer'>
					<HomeIcon className="w-6" />
					<p className='mx-2 font-bold text-md hover:text-teal-400'>
						Home
					</p>
				</a>
			</Link>
			<Link href={"/"}>
				<a href='' className='flex items-center mx-4 hover:cursor-pointer'>
					<GiftIcon className="w-6" />
					<p className='mx-2 font-bold text-md hover:text-teal-400'>
						Marketplace
					</p>
				</a>
			</Link>
		</div>
	)
}

export default menu
