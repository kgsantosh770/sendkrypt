import RightArrowIcon from '../assets/images/right-arrow.png';

interface CardProps {
    transactionId: number,
}

export default function TransactionCard(props: CardProps) {
    const dummyData = {
        fromAddress: "0x234...6939",
        toAddress: "0x736...9823",
        message: "dummy transaction",
        timeStamp: new Date(),
        amount: 134.45,
        currency: "eth",
        image: 'https://i.imgur.com/4Q3uEQ1.jpeg',
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
        <div className="bg-customblue-100 relative mr-14 my-0 lg:mt-5 w-[290px] rounded-lg shadow-lg shadow-gray-800 overflow-hidden">
            <div className="overflow-hidden">
                <img src={dummyData.image} alt="card-image" className="hover:scale-110 w-full h-full" />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <span>{getDateFromTimestamp(dummyData.timeStamp)}</span>
                    <span>{getTimeFromTimestamp(dummyData.timeStamp)}</span>
                </div>
                <p className="pt-4">{dummyData.message.charAt(0).toLocaleUpperCase() + dummyData.message.slice(1,)}</p>
                <div className="flex justify-between items-center pt-1">
                    <span>{dummyData.fromAddress}</span>
                    <img src={RightArrowIcon} alt="right-arrow" className="inline-block w-6 h-4 mt-1" />
                    <span>{dummyData.toAddress}</span>
                </div>
                <p className='text-2xl text-center font-bold pt-3'>{dummyData.amount} {dummyData.currency.toLocaleUpperCase()}</p>
            </div>
        </div>
    )
}
