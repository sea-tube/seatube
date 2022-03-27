import { useContext, useState } from "react"
import Modal from "../layout/Modal"
import CustomQRCode from "../logic/CustomQRCode"
import Web3Context from "../../contexts/Web3Context"
import WalletConnectProvider from "@walletconnect/web3-provider"

const INFURA_ID = "6825d09ca5e343e7bb9478a7fb3c814a"

interface IWalletConnect {
	onError?: any
	children?: any
}

export default function WalletConnect({ onError, children }: IWalletConnect) {
	const { setWeb3Provider } = useContext(Web3Context)

	const [openQRModal, setOpenQRModal] = useState<boolean>(false)
	const [walletIsConnected, setWalletIsConnected] = useState<boolean>(false)
	const [walletConnectURI, setWalletConnectURI] = useState<string>("")

	const connect = () => {
		setOpenQRModal(true)

		const provider = new WalletConnectProvider({
			infuraId: INFURA_ID,
			qrcode: false,
		})

		provider.connector.on("display_uri", (err, payload) => {
			if (err) {
				console.error(err)
				if (onError) onError(err)
				return
			}
			const uri = payload.params[0]
			setWalletConnectURI(uri)
		})

		//  Enable session
		provider
			.enable()
			.then(() => {
				setWalletIsConnected(true)
				setWeb3Provider(provider)
			})
			.catch((err) => {
				console.error(err)
				if (onError) onError(err)
			})
	}

	return (
		<>
			<Modal isOpen={openQRModal} onClose={() => setOpenQRModal(false)}>
				<CustomQRCode data={walletConnectURI} image={"/logo.png"} />
				{!walletIsConnected ? (
					<div>
						<p>Connect with your Metamask Mobile</p>
					</div>
				) : (
					<div>
						<p>Connected!</p>
						<p>Now sign the login message, please.</p>
					</div>
				)}
			</Modal>
			<div onClick={connect}>{children}</div>
		</>
	)
}
