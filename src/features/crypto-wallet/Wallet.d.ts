interface IWallet {
    isWalletConnected: boolean,
    accountAddress: string,
    transferInProgress: boolean,
    setTransferInProgress: Dispatch<SetStateAction<boolean>>,
    connectToWallet: ()=>Promise<void>
}

interface IProps {
    children: ReactNode,
}