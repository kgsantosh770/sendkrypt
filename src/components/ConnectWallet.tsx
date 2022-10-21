export default function ConnectWallet() {
    const dummyData = {
        walletAddress: undefined,
    }
    return (
        <div className="text-center">
            <span className="text-2xl font-bold mr-3 italic">SendKrypt</span>
            <span>offers you secure crypto currency transaction service. You can check your transactions anytime, anywhere.</span>
            <p className="mt-6">The developer of SendKrypt is looking for a job as blockchain developer. 🙂</p>
            {dummyData.walletAddress === undefined &&
                <>
                    <p className="mt-6">Connect to your metamask wallet to start sending cryptos.</p>
                    <button className="bg-blue-600 block mx-auto mt-8 px-10 py-4 rounded-full hover:bg-blue-700">Connect Wallet</button>
                </>
            }
        </div>
    )
}
