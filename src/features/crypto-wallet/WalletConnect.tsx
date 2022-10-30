import { createContext, useContext, useState } from "react";
declare var window: IEthWindow;

const initialWalletState: IWallet = {
    isWalletConnected: false,
    accountAddress: undefined,
    connectToWallet: async()=>{},
}

const WalletContext = createContext<IWallet>(initialWalletState);
const { ethereum } = window;


function WalletProvider({ children }: IProps) {
    const [isWalletConnected, setisWalletConnected] = useState(initialWalletState.isWalletConnected);
    const [accountAddress, setAccountAddress] = useState(initialWalletState.accountAddress);

    const connectToWallet = async () => {
        if (!ethereum) return;
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setAccountAddress(accounts[0]);
            setisWalletConnected(true);
        } catch (error) {
            console.log(error);
        }
    }    

    return (
        <WalletContext.Provider value={{ isWalletConnected, accountAddress, connectToWallet } as IWallet} >
            {children}
        </WalletContext.Provider>
    )
}

const useWalletContext = () => {
    return useContext(WalletContext);
};

export { WalletProvider, useWalletContext }
