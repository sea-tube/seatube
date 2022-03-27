import Link from "next/link"
import Image from "next/image"

const logo = () => {
	return (
		<>
			<div className='ml-3 lg:ml-0'>
				<img src='/assets/logo.svg' alt='' width='160' />
			</div>
		</>
	)
}

export default logo
