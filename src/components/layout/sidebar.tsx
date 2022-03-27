import { AdjustmentsIcon, GiftIcon, HomeIcon, NewspaperIcon, ReceiptRefundIcon, ShieldCheckIcon, UserCircleIcon } from "@heroicons/react/solid"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../contexts/AuthContext"
import Burger from "./burger"
import Logo from "./logo"

const Sidebar = () => {

	const [sideBarActive, setSideBarActive] = useState<boolean>(false)
	const [eventListing, setEventListing] = useState<boolean>(false)

	useEffect(() => {
		sideBarActive ? document.body.classList.add("no-scroll") : document.body.classList.remove("no-scroll")
		const sidebar = document.querySelector(".sidebar")
		sidebar.classList.toggle("-translate-x-full")
		setEventListing(true)
		return () => { }
	}, [sideBarActive])

	return (
		<>
			<div id="scrim" className={`absolute top-0 left-0 w-screen h-screen bg-black/60 z-10 ${!sideBarActive && 'hidden'}`}
				onClick={() => setSideBarActive(!sideBarActive)}></div>
			<aside className={`absolute top-0 left-0 w-auto border-r-2 border-secondary-color ${sideBarActive ? 'h-screen' : 'sm:h-screen'}`}>
				<div className={`absolute inset-y-0 left-0 z-50 flex flex-col ${sideBarActive ? 'w-64' : 'w-18'} h-full transition duration-200 ease-in-out transform -translate-x-full bg-primary-color sidebar lg:relative lg:translate-x-0 lg:block lg:mt-0 text-white`}>
					<div className='pl-3 flex items-center hover:cursor-pointer hover:bg-secondary-color' style={{ height: 56 }}
						onClick={() => setSideBarActive(!sideBarActive)}
					>
						<Burger />
						<div className={`${!sideBarActive && 'hidden'}`}>
							<Logo />
						</div>
					</div>
					<div className={`${!sideBarActive && 'hidden'} sm:block`}>
						{/*  links top */}
						<div className='flex-col mx-4'>
							<Link href={"/home"}>
								<a
									href=''
									className='flex items-center p-2 mb-4 rounded hover:cursor-pointer hover:bg-secondary-color'>
									<HomeIcon className="w-6" />
									<p className={`mx-2 font-bold text-md hover:text-teal-400 ${!sideBarActive && 'hidden'}`}>
										Home
									</p>
								</a>
							</Link>
						</div>
						<div className='flex-col mx-4'>
							<Link href={"/"}>
								<a
									href=''
									className='flex items-center p-2 mb-4 rounded hover:cursor-pointer hover:bg-secondary-color'>
									<GiftIcon className="w-6" />
									<p className={`mx-2 font-bold text-md hover:text-teal-400 ${!sideBarActive && 'hidden'}`}>
										Marketplace
									</p>
								</a>
							</Link>
						</div>
						<div className='flex-col mx-4'>
							<Link href={"/account"}>
								<a
									href=''
									className='flex items-center p-2 mb-4 rounded hover:cursor-pointer hover:bg-secondary-color'>
									<UserCircleIcon className="w-6" />
									<p className={`mx-2 font-bold text-md hover:text-teal-400 ${!sideBarActive && 'hidden'}`}>
										Account
									</p>
								</a>
							</Link>
							<Link href={"/activity"}>
								<a
									href=''
									className='flex items-center p-2 mb-4 rounded hover:cursor-pointer hover:bg-secondary-color'>
									<NewspaperIcon className="w-6" />
									<p className={`mx-2 font-bold text-md hover:text-teal-400 ${!sideBarActive && 'hidden'}`}>
										Activity
									</p>
								</a>
							</Link>
							<Link href={"/claim"}>
								<a
									href=''
									className='flex items-center p-2 mb-4 rounded hover:cursor-pointer hover:bg-secondary-color'>
									<ReceiptRefundIcon className="w-6" />
									<p className={`mx-2 font-bold text-md hover:text-teal-400 ${!sideBarActive && 'hidden'}`}>
										Claim Tokens
									</p>
								</a>
							</Link>
							<Link href={"/account-settings"}>
								<a
									href=''
									className='flex items-center p-2 mb-4 rounded hover:cursor-pointer hover:bg-secondary-color'>
									<AdjustmentsIcon className="w-6" />
									<p className={`mx-2 font-bold text-md hover:text-teal-400 ${!sideBarActive && 'hidden'}`}>
										Settings
									</p>
								</a>
							</Link>
						</div>

						<div className='mx-4 mt-8 border-t border-gray-700'>
							<Link href={"/moderation"}>
								<a
									href=''
									className='flex items-center p-2 mb-4 rounded hover:cursor-pointer hover:bg-secondary-color'>
									<ShieldCheckIcon className="w-6" />
									<p className={`mx-2 font-bold text-md hover:text-teal-400 ${!sideBarActive && 'hidden'}`}>
										Moderation
									</p>
								</a>
							</Link>
						</div>
					</div>
				</div>
			</aside>
		</>
	)
}

export default Sidebar
