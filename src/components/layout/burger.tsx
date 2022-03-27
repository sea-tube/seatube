import { MenuIcon } from "@heroicons/react/solid"
const Burger = () => {
	return (
		<>
			<div className='mobile-menu-button'>
				<button className='p-2 mobile-menu-button focus:outline-teal-400'>
					<MenuIcon className="w-8 text-gray-300" /> 
				</button>
			</div>
		</>
	)
}

export default Burger
