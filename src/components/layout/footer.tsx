import Link from "next/link"

const Footer = () => {
	return (
		<footer className='flex justify-between w-screen p-4 border-t border-gray-600 bg-secondary-color md:justify-center md:items-center '>
			<Link href={"/"}>
				<a className='mr-4 text-xl text-gray-100 hover:font-bold'>Terms</a>
			</Link>
			<Link href={"/"}>
				<a className='mx-4 text-xl text-gray-100 hover:font-bold'>Privacy</a>
			</Link>
			<p className='mx-4 text-gray-400 '>
				&copy; SeaTube {new Date().getFullYear()}
			</p>
		</footer>
	)
}

export default Footer
