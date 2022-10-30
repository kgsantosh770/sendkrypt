interface IWallet {
    isWalletConnected: boolean,
    accountAddress: string,
    connectToWallet: ()=>Promise<void>
}

interface IProps {
    children: ReactNode,
}

interface IEthWindow extends Window {
    ethereum: any,
}