import { AdjustmentsIcon, GiftIcon, HomeIcon, NewspaperIcon, ReceiptRefundIcon, ShieldCheckIcon, UserCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Burger from "./burger";
import Logo from "./logo";

const tabs = [
	{
		name: "Home",
		href: "/",
		icon: HomeIcon,
		current: false,
	},
	{
		name: "Profile",
		href: "/profile",
		icon: UserCircleIcon,
		current: false,
	},
	{
		name: "Marketplace",
		href: "/marketplace",
		icon: GiftIcon,
		current: false,
	},
	{
		name: "Activity",
		href: "/activity",
		icon: NewspaperIcon,
		current: false,
	},
	{
		name: "Claims",
		href: "/claims",
		icon: ReceiptRefundIcon,
		current: false,
	},
	{
		name: "Settings",
		href: "/settings",
		icon: AdjustmentsIcon,
		current: false,
	},
]

export default function Sidebar() {

	const [sideBarActive, setSideBarActive] = useState<boolean>(false);
	const sideBarRef = useRef<HTMLDivElement>();

	useEffect(() => {
		sideBarActive ? document.body.classList.add("no-scroll") : document.body.classList.remove("no-scroll");
		if (sideBarRef.current) {
			sideBarRef.current.classList.toggle("-translate-x-full");
		}
	}, [sideBarActive, sideBarRef])

	return (
		<>
			<div
				id="scrim"
				className={`absolute top-0 left-0 w-screen h-screen bg-black/60 z-50 ${!sideBarActive && 'hidden'}`}
				onClick={() => setSideBarActive(!sideBarActive)}
			/>
			<aside className={`fixed top-0 left-0 w-auto dark:border-r-2 border-secondary-color z-50 ${sideBarActive ? 'h-screen' : 'sm:h-screen'}`}>
				<div className={`absolute inset-y-0 left-0 flex flex-col ${sideBarActive ? 'w-64' : 'w-14'} h-full transition duration-200 ease-in-out transform -translate-x-full bg-teal-muted dark:bg-primary-color sidebar lg:relative lg:translate-x-0 lg:block lg:mt-0 text-white`} ref={sideBarRef}>
					<div className='pl-1 flex items-center hover:cursor-pointer hover:bg-secondary-color'
						onClick={() => setSideBarActive(!sideBarActive)}
					>
						<Burger />
						<div className={`${!sideBarActive && 'hidden'}`}>
							<Logo ligth={true} />
						</div>
					</div>
					<div className={`${!sideBarActive && 'hidden'} sm:block`}>
						<div className='flex-col px-2'>
							{
								tabs.map((tab, index) => (
									<Link href={tab.href} key={index}>
										<a
											className='flex items-center p-2 mb-4 rounded hover:cursor-pointer hover:bg-secondary-color'>
											<tab.icon className="w-5" />
											<p className={`mx-2 font-bold text-md hover:text-teal-400 ${!sideBarActive && 'hidden'}`}>
												{tab.name}
											</p>
										</a>
									</Link>
								))
							}
						</div>

						{/*Separator*/}
						<div className='w-1/2 mx-auto h-px my-4 border-t border-secondary-color border-opacity-50' />

						<div className='flex-col px-2'>
							<Link href={"/moderation"}>
								<a
									href=''
									className='flex items-center p-2 mb-4 rounded hover:cursor-pointer hover:bg-secondary-color'>
									<ShieldCheckIcon className="w-5" />
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