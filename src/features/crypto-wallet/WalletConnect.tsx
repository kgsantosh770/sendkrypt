import { createContext, useContext, useEffect, useState } from "react";
import { ethereum } from "../../utils/Constants";

const initialWalletState: IWallet = {
    isWalletConnected: false,
    accountAddress: '',
    connectToWallet: async () => { },
}

const WalletContext = createContext<IWallet>(initialWalletState);

function WalletProvider({ children }: IProps) {
    const [isWalletConnected, setisWalletConnected] = useState(initialWalletState.isWalletConnected);
    const [accountAddress, setAccountAddress] = useState(initialWalletState.accountAddress);

    const isConnected = async() => {
        if (!ethereum) return false;
        try {
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length !== 0) {
                setAccountAddress(accounts[0]);
                setisWalletConnected(true);
                return true;
            }
            else
                return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

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

    useEffect(() => {
        isConnected();
    },[])


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
