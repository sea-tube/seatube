import { ethers } from "ethers"
import { createContext, useContext } from "react"
import ToastContext from "./ToastContext"
import Web3Context from "./Web3Context"

type WalletContextType = {
    walletAddress: string;
    signMessage: (message) => any;
    signAsHash: any;
}

const WalletContext = createContext({} as WalletContextType)

export function WalletProvider({ children }: any) {

    const { web3, walletAddress, account } = useContext(Web3Context)

    const { showSuccess, showError, showLoading } = useContext(ToastContext)

    const fetchERC20Balance = async () => {
        const params: any = {
            chain: "97" // Smart Chain - Testnet
        }
        return await account
            .getTokenBalances({
                address: walletAddress,
                chain: params.chain,
            })
            .then((result) => result);
    };

    const signMessage = (message) => new Promise((resolve, reject) => {
        if (!web3) return reject("web3 not set")
        const signer = web3.getSigner()
        signer.signMessage(message)
            .then(resolve)
            .catch(reject)
    })

    const signAsHash = (arrTypes, arrData) => {
        const messageHash = ethers.utils.solidityKeccak256(arrTypes, arrData)
        console.log("messageHash", messageHash)
        let messageHashBinary = ethers.utils.arrayify(messageHash);
        return signMessage(messageHashBinary)
    }

    return (
        <WalletContext.Provider value={{ walletAddress, signMessage, signAsHash }}>
            {children}
        </WalletContext.Provider>
    )
}

export default WalletContext
