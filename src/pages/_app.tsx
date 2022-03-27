import { ToastProvider } from "../contexts/ToastContext"
import { RouteGuardProvider } from "../contexts/RouteGuard"
import { AuthProvider } from "../contexts/AuthContext"
import { Web3Provider } from "../contexts/Web3Context"
import { WalletProvider } from "../contexts/WalletContext"
import { MoralisProvider } from "react-moralis";
import "../styles/globals.css"
import "react-toastify/dist/ReactToastify.css"

function MyApp({ Component, pageProps }) {
	return (
		<MoralisProvider initializeOnMount={false}>
			<ToastProvider>
				{/*<RouteGuardProvider>*/}
				<AuthProvider>
					<Web3Provider>
						<WalletProvider>
							<Component {...pageProps} />
						</WalletProvider>
					</Web3Provider>
				</AuthProvider>
				{/*</RouteGuardProvider>*/}
			</ToastProvider>
		</MoralisProvider>
	)
}

export default MyApp
