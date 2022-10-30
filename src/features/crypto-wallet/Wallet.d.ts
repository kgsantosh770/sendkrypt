interface IWallet {
    isWalletConnected: boolean,
    accountAddress: string | undefined,
    connectToWallet: ()=>Promise<void>
}

interface IProps {
    children: ReactNode,
}

interface IEthWindow extends Window {
    ethereum: any,
}