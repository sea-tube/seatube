type Pageprops = {
	name: string
	breadcrumb: string
}

const page_header = ({ name, breadcrumb }: Pageprops) => {
	return (
		<div className='w-full mb-1'>
			<div className='mb-4'>
				<nav className='flex mb-5' aria-label='Breadcrumb'>
					<ol className='inline-flex items-center space-x-1 md:space-x-2'>
						<li className='inline-flex items-center'>
							<a
								href='#'
								className='inline-flex items-center text-gray-700 hover:text-gray-900'>
								<img src='/images/icons/home.svg' className='w-4 h-4 mr-3' />
								Home
							</a>
						</li>

						<li>
							<div className='flex items-center'>
								<img src='/images/icons/right_arrow.svg' className='w-4 h-3' />
								<a
									href='#'
									className='ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2'>
									{breadcrumb}
								</a>
							</div>
						</li>
					</ol>
				</nav>
				<h1 className='text-xl font-semibold text-gray-900 sm:text-2xl'>
					{name}
				</h1>
			</div>
			<div className='sm:flex'>
				<div className='items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0'></div>
			</div>
		</div>
	)
}

export default page_header
