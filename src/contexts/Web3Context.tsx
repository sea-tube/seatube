import { useState, createContext, useContext, useEffect } from "react"
import Web3 from "web3"
import { useRouter } from "next/router"
import ToastContext from "./ToastContext"
import Modal from '../components/layout/Modal'
import { FaTimesCircle } from 'react-icons/fa';
import AuthContext from "../contexts/AuthContext"
import OrbitDB from './Orbitdb'
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { ethers } from "ethers";

const networks: any = {
	1: 'Ethereum Mainnet',
	4: 'Ethereum Rinkeby',
	97: 'Binance Smart Chain Testnet',
	80001: 'Polygon Mumbai Testnet',
	5777: 'Ganache',
	1666600000: 'Harmony'
}

type Web3ContextType = {
	walletAddress: string;
	web3: any;
	account: any;
}

const networkParams = {
	bsc: {
		mainnet: {
			chainId: '0x38', // Hexadecimal version of 56, prefixed with 0x
			chainName: "Smart Chain",
			nativeCurrency: {
				name: "Binance Coin",
				symbol: "BNB",
				decimals: 18,
			},
			rpcUrls: ['https://bsc-dataseed.binance.org/'],
			blockExplorerUrls: ['https://bscscan.com'],
			iconUrls: [""]
		},
		testnet: {
			chainId: '0x61', // Hexadecimal version of 97, prefixed with 0x
			chainName: "Smart Chain Testnet",
			nativeCurrency: {
				name: "Binance Coin",
				symbol: "BNB",
				decimals: 18,
			},
			rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
			blockExplorerUrls: ['https://testnet.bscscan.com/'],
			iconUrls: [""]
		}
	}
}

const ABI = [{
	"inputs": [
        {
          "internalType": "string",
          "name": "videoName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "cid",
          "type": "string"
        },
        {
          "internalType": "bytes[]",
          "name": "permissionProofs",
          "type": "bytes[]"
        }
      ],
      "name": "publishVideo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
}];

const Web3Context = createContext({} as Web3ContextType)

export function Web3Provider({ children }: any) {

	//const { authenticate, isAuthenticated, user } = useMoralis();

	const { account, Web3API } = useMoralisWeb3Api();
	const { Moralis, web3, isInitialized, chainId, account: walletAddress, user, enableWeb3, isWeb3Enabled, web3EnableError, authenticate, provider } = useMoralis();

	const [providerInfo, setProviderInfo] = useState<any>(null)

	const [invalidNetwork, setInvalidNetwork] = useState<boolean>(false)

	const { showSuccess, showError, showLoading } = useContext(ToastContext)

	const router = useRouter()

	const [web3x, setWeb3] = useState<any>(null)
	const [accountx, setAccount] = useState<string | null>(null)

	useEffect(() => {
		console.log(isWeb3Enabled)
		if (!isWeb3Enabled) {
			return
			console.log("enabling web3")
			enableWeb3({
				provider: "metamask",
				chainId: 43113,
				onSuccess: (res: any) => console.info("Success!", res),
				onComplete: () => console.info("Completed!"),
				onError: (err: any) => console.error(err),
				throwOnError: true
			})
		}
	}, [])

	useEffect(() => {
		if (web3EnableError) alert(web3EnableError)
	}, [web3EnableError])

	useEffect(() => {
		if (isInitialized) {
			console.log(account)
			console.log(walletAddress)
			//fetchERC20Balance().then((balance) => console.log(balance));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isInitialized, chainId, walletAddress])

	const fetchERC20Balance = async () => {
		const params: any = {
			chain: "97" // Smart Chain - Testnet
		}
		return await account
			.getTokenBalances({
				address: walletAddress,
				chain: params?.chain || chainId,
			})
			.then((result) => result);
	};

	useEffect(() => {

		if (!web3) return

		OrbitDB(web3.provider)

		alert(chainId)

		console.log(walletAddress)
		console.log(chainId)
		//if (getNetworkName(chainId) != "Binance Smart Chain Testnet") return setInvalidNetwork(true)

		const message = "hello world!"

		const signer = web3.getSigner()

		// signer.signMessage(message)
		// 	.then((signature) => {
		// 		//signMessage.hide()
		// 		const authMessage = showLoading("Authenticating...")

		// 		router.push("/account")
		// 	})
		// 	.catch(showError)

		const options = {
			contractAddress: "0xf522C097CA0E61bF4283710FEA847a88BF19990A",
			functionName: "publishVideo",
			abi: ABI,
			params: {videoName: "test", cid: "bafybeibonosd36h75az246oqicyancmrfeeaaczdemxf7otiwfzvhpbi4a", permissionProofs: ["0x993dab3dd91f5c6dc28e17439be475478f5635c92a56e17e82349d3fb2f166196f466c0b4e0c146f285204f0dcb13e5ae67bc33f4b888ec32dfe0a063e8f3f781b"]}
		};
		Moralis.executeFunction(options)
			.then(console.info)
			.catch(console.error)

	}, [web3])

	// Automatically set Web3 with provider
	useEffect(() => {
		providerInfo && setWeb3(new Web3(providerInfo.provider))
	}, [providerInfo])

	// Set Web3 Provider
	const setWeb3Provider = (providerInfo: any) => setProviderInfo(providerInfo)

	function getNetworkName(chainID: number) {
		return chainID in networks ? networks[chainID] : 'unknown network'
	}

	return (
		<Web3Context.Provider value={{ walletAddress, web3, account }}>
			{
				invalidNetwork &&
				<Modal isOpen={invalidNetwork}>
					<FaTimesCircle size={42} color="red" className='mr-4' />
					<div>
						<h3 className='text-xl text-gray-500'>Invalid Network!</h3>
						<p className='text-base text-gray-600'>Please change your metamask network to continue.</p>
						<button className="group h-14 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center"
						>
							<img src="/assets/metamask.svg" className="w-8 mr-4" />
							<h3 className="text-base text-white">Change Metamask Network</h3>
						</button>
					</div>
				</Modal>
			}
			{children}
		</Web3Context.Provider>
	)
}

export default Web3Context
