import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import RightArrowIcon from '../assets/images/right-arrow.png';
import fetchImage from '../features/fetch-keyword-image/FetchImage';
import { addressShortener } from '../utils/Utils';

interface CardProps {
    cardType: string,
    transaction: ethers.Event,
}

TransactionCard.defaultProps = {
    cardType: 'vertical',
}

export default function TransactionCard(props: CardProps) {
    // console.log(props.transaction.args && new Date(props.transaction.args[0].timestamp * 1000));
    const [image, setImage] = useState(null)
    const txn = {
        fromAddress: props.transaction.args ? addressShortener(props.transaction.args[0].from) : 'Anonymous',
        toAddress: props.transaction.args ? addressShortener(props.transaction.args[0].to) : 'Anonymous',
        message: props.transaction.args ? props.transaction.args[0].message : 'Unknown message',
        timeStamp: props.transaction.args ? new Date(props.transaction.args[0].timestamp * 1000) : new Date(),
        amount: props.transaction.args ? ethers.utils.formatEther(props.transaction.args[0].amount) : 'Unknown amount',
        currency: "eth",
        keyword: props.transaction.args ? props.transaction.args[0].keyword : null,
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

    useEffect(() => {
        fetchImage(txn.keyword).then(
            (result) => setImage(result[0].urls.small)
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={`flex flex-col bg-customblue-100 relative ${props.cardType === 'vertical' ? 'mx-auto' : 'mr-14'} my-0 lg:mb-10 lg:mt-5 w-[290px] rounded-lg shadow-lg shadow-gray-800 overflow-hidden`}>
            {
                image &&
                <div className="overflow-hidden">
                    <img src={image} alt="card" className="hover:scale-110 w-full h-[200px]" />
                </div>
            }
            <div className="relative grow shrink basis-auto">
                <div className="p-4 flex justify-between items-center bg-gray-500">
                    <span>{getDateFromTimestamp(txn.timeStamp)}</span>
                    <span>{getTimeFromTimestamp(txn.timeStamp)}</span>
                </div>
                <p className="p-4 pb-28 whitespace-pre-wrap italic">{txn.message.charAt(0).toLocaleUpperCase() + txn.message.slice(1,)}</p>
                <p className='absolute bottom-9 w-full p-4 text-2xl text-center font-bold pt-3'>{`${txn.amount} ${txn.currency.toLocaleUpperCase()}`}</p>
                <div className="flex justify-between items-center p-4 w-full absolute bottom-1">
                    <span>{txn.fromAddress}</span>
                    <img src={RightArrowIcon} alt="right-arrow" className="inline-block w-6 h-4 mt-1" />
                    <span>{txn.toAddress}</span>
                </div>
            </div>
        </div>
    )
}
