import Logo from '../assets/images/ether.png';
import { useWalletContext } from '../features/crypto-wallet/WalletConnect';

interface HeaderProps {
    className?: string,
}

export default function Header(props: HeaderProps) {
    const {isWalletConnected} = useWalletContext();
    return (
        <header className={`py-8 flex justify-between font-semibold ${props.className}`}>
            <div className='flex items-center'>
                <img src={Logo} alt='logo' title='sendkrypt'
                    className='medium-icon mr-3'
                />
                <h4 className='text-3xl font-bold'>SendKrypt</h4>
            </div>
            <nav>
                <ul className='flex items-center'>
                    <li className="px-5"><a href="#recentTransactions">Recent Transactions</a></li>
                    {isWalletConnected && <li className="px-5"><a href="#myTransactions">My Transactions</a></li>}
                </ul>
            </nav>
        </header>
    )
}