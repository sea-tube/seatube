import { ethers } from "ethers"
import { createContext, useContext } from "react"
import Web3Context from "./Web3Context"

type WalletContextType = {
    account: string
    signMessage: (message) => any;
    signAsHash: any;
}

const WalletContext = createContext({} as WalletContextType)

export function WalletProvider({ children }: any) {

    const { web3, account } = useContext(Web3Context)

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
        <WalletContext.Provider value={{ account, signMessage, signAsHash }}>
            {children}
        </WalletContext.Provider>
    )
}

export default WalletContext
