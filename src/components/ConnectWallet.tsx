import { useWalletContext } from "../features/crypto-wallet/WalletConnect";

export default function ConnectWallet() {
    const { isWalletConnected, connectToWallet } = useWalletContext();

    return (
        <div>
            <p className="text-5xl italic mb-10 leading-tight">SendKrypt <br />across the world</p>
            <div className="w-full lg:w-2/3">Secure crypto currency transaction service. You can check your transactions anytime, anywhere.</div>
            <table className="mt-8 w-full border-separate">
                <tbody>
                    <tr className="text-center">
                        <td className="w-[33%] px-3 py-4 rounded-tl-md border border-white">Ethereum</td>
                        <td className="w-[33%] px-3 py-4 border border-white">Metamask</td>
                        <td className="w-[33%] px-3 py-4 rounded-tr-md border border-white">Web 3.0</td>
                    </tr>
                    <tr className="text-center">
                        <td className="w-[33%] px-3 py-4 rounded-bl-md border border-white">Security</td>
                        <td className="w-[33%] px-3 py-4 border border-white">Reliability</td>
                        <td className="w-[33%] px-3 py-4 rounded-br-md border border-white">Low fees</td>
                    </tr>
                </tbody>
            </table>
            {!isWalletConnected &&
                <button
                    onClick={connectToWallet}
                    className="bg-blue-600 lg:max-w-max block mx-auto m-10 lg:mb-0 px-10 py-4 rounded-full hover:bg-blue-700 w-full">
                    Connect Wallet
                </button>
            }
        </div>
    )
}
