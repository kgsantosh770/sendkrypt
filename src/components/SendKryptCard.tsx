import Logo from '../assets/images/ether.png';

export default function SendKryptCard() {
    const dummyData = {
        walletAddress: undefined,
    }
    return (
        <div className='relative max-w-sm px-4 py-8 rounded-lg min-h-[210px] bg-gradient-to-r from-[#833a4b] via-[#fd1d1d] to-[#fcb045]'>
            <span>SendKrypt Card</span>
            <img src={Logo} alt='sendkrypt card' className='medium-icon float-right' />
            <div className='absolute bottom-5'>
                {dummyData.walletAddress === undefined ?
                    "Connect wallet to activate card." :
                    "0x456...2346"}
                <p className="mt-1 font-bold text-2xl">Ethereum Krypt</p>
            </div>
        </div>
    )
}
