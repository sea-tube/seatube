import Link from "next/link"
import Image from "next/image"

export default function Logo ({ligth = false}) {

	const logo = ligth ? "/assets/logo-light.svg" : "/assets/logo.svg"

	return (
		<>
			<div className='ml-6 lg:ml-3'>
				<img src={logo} alt='' className="w-36 sm:w-40" />
			</div>
		</>
	)
}