import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { classNames } from "utils";
import Logo from "./logo";
import {
	AdjustmentsIcon,
	GiftIcon,
	HomeIcon,
	MenuAlt2Icon,
	NewspaperIcon,
	ReceiptRefundIcon,
	ShieldCheckIcon,
	UserCircleIcon,
	XIcon
} from "@heroicons/react/solid";

const navigation = [
	{
		name: "Home",
		href: "/home",
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

const adminTabs = [
	{
		name: "Moderation",
		href: "/moderation",
		icon: ShieldCheckIcon,
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
				className={`absolute top-0 left-0 w-screen h-screen bg-black/60 z-30 ${!sideBarActive && 'hidden'}`}
				onClick={() => setSideBarActive(!sideBarActive)}
			/>
			<aside className={`fixed top-0 left-0 border-r dark:border-r-2 border-gray-100 z-30 bg-white ${sideBarActive ? 'h-screen' : 'sm:h-screen'}`}>
				<div className={`flex flex-col overflow-x-auto overflow-x-hidden ${sideBarActive ? 'w-64' : 'w-14'} h-full transition-width duration-500 transform -translate-x-full bg-white dark:bg-primary-color sidebar lg:translate-x-0 lg:block lg:mt-0`} ref={sideBarRef}>
					<div className='pl-1 flex items-center hover:cursor-pointer hover:bg-secondary-color'
						onClick={() => setSideBarActive(!sideBarActive)}
					>
						<div className="flex flex-1 flex-col">
							<div className="top-0 z-10 flex items-center justify-center border-b border-gray-200 py-6" style={{
								height: 56
							}}>
								{
									sideBarActive
										? <Logo />
										: <button
											type="button"
											className="px-4 text-gray-00 focus:outline-none"
											onClick={() => setSideBarActive(true)}
										>
											<span className="sr-only">Open sidebar</span>
											<MenuAlt2Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
										</button>
								}
							</div>
						</div>

					</div>
					<div className={`${!sideBarActive && 'hidden'} sm:block`}>
						<div className='flex-col px-2 pt-4'>
							{
								navigation.map((tab, index) => (
									<Link href={tab.href} key={index}>
										<a
											className='flex items-center p-2 mb-4 rounded hover:cursor-pointer hover:bg-secondary-color text-gray-400 hover:text-white'>
											<div><tab.icon className="w-5" /></div>
											<div className={classNames(
												`mx-2 font-bold text-md transition ease-in-out duration-700 absolute ml-8 z-10`,
												sideBarActive ? 'opacity-100' : 'opacity-0'
											)}>
												{tab.name}
											</div>
										</a>
									</Link>
								))
							}
						</div>

						{/*Separator*/}
						<div className='w-1/2 mx-auto h-px my-4 border-t border-gray-200' />

						<div className='flex-col px-2'>
							{
								adminTabs.map((tab, index) => (
									<Link href={tab.href} key={index}>
										<a
											className='flex items-center p-2 mb-4 rounded hover:cursor-pointer hover:bg-secondary-color text-gray-400 hover:text-white'>
											<div><tab.icon className="w-5" /></div>
											<div className={classNames(
												`mx-2 font-bold text-md transition ease-in-out duration-700 absolute ml-8 z-10`,
												sideBarActive ? 'opacity-100' : 'opacity-0'
											)}>
												{tab.name}
											</div>
										</a>
									</Link>
								))
							}
						</div>
					</div>
				</div>
				{
					sideBarActive &&
					<div className="absolute top-0 right-0 -mr-12 pt-2">
						<button
							type="button"
							className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							onClick={() => setSideBarActive(false)}
						>
							<span className="sr-only">Close sidebar</span>
							<XIcon className="h-6 w-6 text-white" aria-hidden="true" />
						</button>
					</div>
				}
			</aside>
		</>
	)
}
