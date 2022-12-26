
type Sizes = 'small' | 'medium' | 'large';

interface AvatarProps {
	url: string;
	size?: Sizes;
}

const sizes: Record<Sizes, number> = {
	small: 28,
	medium: 42,
	large: 64
}

export default function Avatar ({ url, size = 'medium' }: AvatarProps) {
	return (
		<div className='flex rounded-full  ring-2 ring-offset-2 ring-primary-light'>
			<img src={url} className='rounded-full' width={sizes[size]} height={sizes[size]} />
		</div>
	)
}