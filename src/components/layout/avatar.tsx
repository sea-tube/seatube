import Image from "next/image"

const Avatar = ({ avatarUrl }) => {
	return (
		<div className='flex rounded-full  ring-2 ring-offset-2 ring-teal-400'>
			<img src={avatarUrl} className='rounded-full w-6 h-6 sm:w-8 sm:h-8' />
		</div>
	)
}

export default Avatar
