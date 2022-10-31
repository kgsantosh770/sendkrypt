import { ethers } from 'ethers';
import RightArrowIcon from '../assets/images/right-arrow.png';
import { addressShortener } from '../utils/Utils';

interface CardProps {
    cardType: string,
    transaction: ethers.Event,
}

TransactionCard.defaultProps = {
    cardType: 'vertical',
}

export default function TransactionCard(props: CardProps) {
    const txn = {
        fromAddress: props.transaction.args ? addressShortener(props.transaction.args[0].from) : 'Anonymous',
        toAddress: props.transaction.args ? addressShortener(props.transaction.args[0].to) : 'Anonymous',
        message: props.transaction.args ? props.transaction.args[0].message : 'Unknown message',
        // timeStamp: new Date(),
        amount: props.transaction.args ? props.transaction.args[0].amount : 'Unknown',
        currency: "eth",
        keyword: props.transaction.args ? props.transaction.args[0].keywork : 'Unknown keyword',
        // image: 'https://i.imgur.com/4Q3uEQ1.jpeg',
    }

    const getDateFromTimestamp = (timestamp: Date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const formattedDate = timestamp.getDate().toLocaleString() + ' ' + monthNames[timestamp.getMonth()].slice(0, 3) + ' ' + timestamp.getFullYear();
        return formattedDate;
    }

    const getTimeFromTimestamp = (timeStamp: Date) => {
        let formattedTime = timeStamp.getHours() + ':';
        formattedTime += timeStamp.getMinutes().toLocaleString().padStart(2, '0') + ':';
        formattedTime += timeStamp.getSeconds().toLocaleString().padStart(2, '0');
        return formattedTime;
    }

    return (
        <div className={`bg-customblue-100 relative ${props.cardType==='vertical' ? 'mx-auto' : 'mr-14'} my-0 lg:mb-10 lg:mt-5 w-[290px] rounded-lg shadow-lg shadow-gray-800 overflow-hidden`}>
            {/* <div className="overflow-hidden">
                <img src={txn.image} alt="card" className="hover:scale-110 w-full h-full" />
            </div> */}
            <div className="p-4">
                {/* <div className="flex justify-between items-center">
                    <span>{getDateFromTimestamp(txn.timeStamp)}</span>
                    <span>{getTimeFromTimestamp(txn.timeStamp)}</span>
                </div> */}
                <p className="pt-4 whitespace-pre-wrap">{txn.message.charAt(0).toLocaleUpperCase() + txn.message.slice(1,)}</p>
                <div className="flex justify-between items-center pt-1">
                    <span>{txn.fromAddress}</span>
                    <img src={RightArrowIcon} alt="right-arrow" className="inline-block w-6 h-4 mt-1" />
                    <span>{txn.toAddress}</span>
                </div>
                {/* <p className='text-2xl text-center font-bold pt-3'>{txn.amount} {txn.currency.toLocaleUpperCase()}</p> */}
            </div>
        </div>
    )
}
