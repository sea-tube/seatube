type SvgProps = {
	classe: string
	icon: string
}

const svg = ({ classe, icon }: SvgProps) => {
	return (
		<svg
			className={classe}
			fill='currentColor'
			viewBox='0 0 20 20'
			xmlns='http://www.w3.org/2000/svg'>
			{icon == "right_arrow_bold" && (
				<path
					fillRule='evenodd'
					d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
				/>
			)}
			{icon == "left_arrow_bold" && (
				<path d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z' />
			)}
			{icon == "edit" && (
				<path d='M5 3c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7H5V5h7V3H5m12.78 1a.69.69 0 0 0-.48.2l-1.22 1.21l2.5 2.5L19.8 6.7c.26-.26.26-.7 0-.95L18.25 4.2c-.13-.13-.3-.2-.47-.2m-2.41 2.12L8 13.5V16h2.5l7.37-7.38l-2.5-2.5z' />
			)}
			{icon == "qr" && (
				<path
					d='M0 6H6V0H0V6ZM2 2H4V4H2V2ZM0 14H6V8H0V14ZM2 10H4V12H2V10ZM14 0H8V6H14V0ZM12 4H10V2H12V4ZM8.01 8H10.01V10H8.01V8ZM10.01 10H12.01V12H10.01V10ZM12.01 12H14.01V14H12.01V12ZM12.01 8H14.01V10H12.01V8Z'
					fill='black'
				/>
			)}
		</svg>
	)
}

export default svg
