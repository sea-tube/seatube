import Modal from 'components/layout/Modal'
import { useMoralis } from "react-moralis";
import { createContext, useContext, useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/outline";
import ToastContext from "./ToastContext";

const ACTIVE_NETWORK = "testnet"
const NETWORK_SETTINGS: any = {
    mainnet: {
        name: 'Celo (Mainnet)',
        chainId: 42220,
        rpcUrl: 'https://forno.celo.org',
        currencyName: 'Celo',
        currencySymbol: 'CELO',
        blockExplorerUrl: 'https://explorer.celo.org'
    },
    testnet: {
        name: 'Celo (Alfajores Testnet)',
        chainId: 44787,
        rpcUrl: 'https://alfajores-forno.celo-testnet.org',
        currencyName: 'Celo',
        currencySymbol: 'CELO',
        blockExplorerUrl: 'https://alfajores-blockscout.celo-testnet.org'
    }
}

type Web3ContextType = {
	account: string | null;
	signMessage: any;
	connectWallet: any;
	web3: any;
	connectMobileWallet: any;
	isWeb3Enabled: boolean;
	isWeb3EnableLoading: boolean;
	provider: any;
}

const Web3Context = createContext({} as Web3ContextType)

export default Web3Context


export function Web3Provider({ children }: any) {

    const {
        Moralis,
        web3,
        chainId,
        account,
        enableWeb3,
        isWeb3Enabled,
        isWeb3EnableLoading,
        deactivateWeb3,
        web3EnableError,
        provider,
    } = useMoralis();

    const [invalidNetwork, setInvalidNetwork] = useState<boolean>(false)

	const { showError } = useContext(ToastContext)

    const signMessage = (message: string) => new Promise((resolve, reject) => {
        web3 !== null ? web3?.getSigner().signMessage(message).then(resolve).catch(reject) : reject("web3 not enabled")
    })

    const connectMetamask = () => new Promise((resolve, reject) => {
        enableWeb3({
            provider: "metamask",
            chainId: NETWORK_SETTINGS[ACTIVE_NETWORK].chainId,
            onSuccess: (res: any) => {
                if (res.network.chainId != NETWORK_SETTINGS[ACTIVE_NETWORK].chainId) {
                    switchNetwork()
                        .then(resolve)
                        .catch(reject)
                } else {
                    resolve(res)
                    console.info("Success!", res)
                }
            },
            onError: (err: any) => {
                console.error("connect metamask error", err);
                reject(err);
            },
            throwOnError: true
        })
    })

    const connectWallet = () => {
        return new Promise((resolve, reject) => {
            connectMetamask()
                .then(resolve)
                .catch(reject)
            //     .finally(() => {
            //         setFirstWeb3Loading(false)
            //         setFirstWeb3Loaded(true)
            //     })
            // setTimeout(() => {
            //     if (!firstWeb3Loaded) setFirstWeb3Loading(true)
            // }, 1000)

        })
    }

    const connectMobileWallet = () => {
        enableWeb3(
            {
                provider: 'walletconnect',
                anyNetwork: true,
                onSuccess: (response: any) => console.log(response),
                onError: (error: any) => {
                    console.error("here:", error)
                    console.error("code:", error.code)
                },
            }
        )
    }

    useEffect(() => {
        if (!account && isWeb3Enabled) {
            console.log("deactivating web3")
            deactivateWeb3()
        }
    }, [account])

    useEffect(() => {
        if (web3EnableError) {
            if ("code" in web3EnableError) {
                if (web3EnableError["code"] == "-32002") {
                    showError("Mematamask contém solicitações pendentes")
                } else if (web3EnableError["code"] == "-32603") {
                    showError("Erro ao conectar com a rede")
                } else if (web3EnableError["code"] == "4001") {
                    showError("Rejeitado pelo usuário")
                } else if ("message" in web3EnableError) {
                    showError(web3EnableError["message"])
                } else {
                    showError(JSON.stringify(web3EnableError))
                }
            }
        }
    }, [web3EnableError])

    // Detect Invalid Network
    useEffect(() => {
        if (!web3 || !chainId) return
        if (Number(chainId) != Number(NETWORK_SETTINGS[ACTIVE_NETWORK].chainId) && web3.provider.isMetaMask) setInvalidNetwork(true)
    }, [web3, chainId])

    // Switch network and add if not present
    const switchNetwork = () => {
        return new Promise((resolve, reject) => {
            Moralis.switchNetwork(NETWORK_SETTINGS[ACTIVE_NETWORK].chainId)
                .then(() => setInvalidNetwork(false))
                .catch((error: any) => {

                    // not found network
                    if ("code" in error && (error.code === 4902 || error.code === -32603)) {
                        console.log(Moralis.web3Library.utils.hexlify(NETWORK_SETTINGS[ACTIVE_NETWORK].chainId))
                        Moralis.addNetwork(
                            Moralis.web3Library.utils.hexlify(NETWORK_SETTINGS[ACTIVE_NETWORK].chainId),
                            NETWORK_SETTINGS[ACTIVE_NETWORK].name,
                            NETWORK_SETTINGS[ACTIVE_NETWORK].currencyName,
                            NETWORK_SETTINGS[ACTIVE_NETWORK].currencySymbol,
                            NETWORK_SETTINGS[ACTIVE_NETWORK].rpcUrl,
                            NETWORK_SETTINGS[ACTIVE_NETWORK].blockExplorerUrl
                        )
                            .then(() => {
                                setInvalidNetwork(false)
                                resolve(true)
                            })
                            .catch(reject)
                    }
                })
        })
    }

    return (
        <Web3Context.Provider value={{ account, signMessage, connectWallet, provider, connectMobileWallet, isWeb3EnableLoading, web3, isWeb3Enabled }}>
            <Modal isOpen={invalidNetwork} onClose={() => setInvalidNetwork(false)}>
                <div className="">
                    <div className="flex justify-center items-center">
                        <XCircleIcon className='w-32 h-32 mr-4 text-red-400' />
                        <div>
                            <h3 className='text-xl text-red-400 my-2 font-bold'>Invalid Network!</h3>
                            <p className='text-base text-gray-600'><span className="font-semibold">{NETWORK_SETTINGS[ACTIVE_NETWORK].name}</span> is needed!</p>
                            <p className='text-base text-gray-600'>Please change your metamask network to continue.</p>
                        </div>
                    </div>
                    <button className="w-80 mx-auto mt-5 h-14 relative flex justify-center py-2 pl-4 pr-16 border border-bioca-orange text-sm font-medium rounded-md text-white bg-bioca-orange/90 hover:bg-bioca-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 items-center"
                        onClick={switchNetwork}
                    >
                        <div className="w-14 absolute right-0 bg-white/80 h-full flex justify-center items-center rounded-md">
                            <img src="/assets/metamask.svg" className="w-12" />
                        </div>
                        <h3 className="text-base text-white">Change Metamask Network</h3>
                    </button>
                </div>
            </Modal>
            {children}
        </Web3Context.Provider>
    )
}