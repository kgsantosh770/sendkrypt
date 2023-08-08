import Logo from '../assets/images/ether.png';
import { addressShortener } from '../utils/Utils';
import { useWalletContext } from '../features/crypto-wallet/WalletConnect';

export default function SendKryptCard() {
    const { isWalletConnected, accountAddress } = useWalletContext();
    return (
        <div className='md:mb-7 relative mx-auto w-[300px] px-4 py-5 rounded-lg min-h-[160px] bg-gradient-to-r from-[#833a4b] via-[#fd1d1d] to-[#fcb045]'>
            <span>SendKrypt Card</span>
            <img src={Logo} alt='sendkrypt card' className='small-icon float-right' />
            <div className='absolute bottom-5'>
                {isWalletConnected ?
                    addressShortener(accountAddress) :
                    "Connect wallet to activate card."
                }
                <p className="mt-1 font-bold text-2xl">Ethereum Krypt</p>
            </div>
        </div>
    )
}
