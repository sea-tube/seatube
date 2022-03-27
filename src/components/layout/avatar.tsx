import Image from "next/image"

const Avatar = ({ avatarUrl }) => {
	return (
		<div className='flex rounded-full  ring-2 ring-offset-2 ring-teal-400'>
			<img src={avatarUrl} width={36} height={36} className='rounded-full' />
		</div>
	)
}

export default Avatar
