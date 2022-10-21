import Logo from '../assets/images/ether.png';

export default function Header() {
    return (
        <header className='py-8 px-10 flex justify-between font-semibold'>
            <div className='flex items-center'>
                <img src={Logo} alt='logo' title='sendkrypt"'
                    className='medium-icon mr-3'
                />
                <h4 className='text-3xl font-bold'>SendKrypt</h4>
            </div>
            <nav>
                <ul className='flex items-center'>
                    <li className="px-5"><a href="#home">Home</a></li>
                    <li className="px-5"><a href="#features">Features</a></li>
                    <li className="px-5"><a href="#transactions">Transactions</a></li>
                </ul>
            </nav>
        </header>
    )
}
