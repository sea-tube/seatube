import { useContext } from "react"
import Web3Modal from "web3modal"
import Web3Context from "../../contexts/Web3Context"

interface IMetamaskConnect {
	onError?: any
	children?: any
}

interface AddEthereumChainParameter {
	chainId: string; // A 0x-prefixed hexadecimal string
	chainName: string;
	nativeCurrency: {
		name: string;
		symbol: string; // 2-6 characters long
		decimals: number;
	};
	rpcUrls: string[];
	blockExplorerUrls?: string[];
	iconUrls?: string[]; // Currently ignored.
}

export const switchNetwork = (provider: any, chainId: string) =>
	new Promise((resolve, reject) =>
		provider.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId }], // Hexadecimal version of 80001, prefixed with 0x
		})
			.then((resolve))
			.catch(reject) // if (error.code === 4902) not found network
	)

export const addNetwork = (provider: any, params: AddEthereumChainParameter) =>
	new Promise((resolve, reject) =>
		provider.request({
			method: 'wallet_addEthereumChain',
			params: [params]
		})
			.then(resolve)
			.catch(reject)
	)

const MetamaskConnect = ({ onError, children }: IMetamaskConnect) => {
	const { setWeb3Provider } = useContext(Web3Context)

	const connect = () => {
		console.log("Ok")
		const web3Modal = new Web3Modal()
		web3Modal.connect()
			.then((provider: any) => {
				console.log(provider)
				setWeb3Provider({
					provider,
					name: "Metamask",
					timestamp: Date.now()
				})
			})
			.catch((err) => {
				console.error(err)
				if (onError) onError(err)
			})
	}

	return (
		<>
			<div onClick={connect}>{children}</div>
		</>
	)
}

export default MetamaskConnect
