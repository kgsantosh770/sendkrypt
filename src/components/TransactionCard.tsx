interface CardProps {
    transactionId: number,
}

export default function TransactionCard(props: CardProps) {
    const dummyData = {
        fromAddress: "0x234...6939",
        toAddress: "0x736...9823",
        timeStamp: new Date(),
        amount: 134.45,
        currency: "ether",
        image: 'https://i.imgur.com/4Q3uEQ1.jpeg',
    }

    return (
        <div className="bg-black relative mx-10 mt-5 mb-20 w-[290px] p-3 pb-5 text-center rounded-2xl font-bold shadow-lg shadow-gray-800">
            <div className='absolute w-[200px] -top-5 left-0 right-0 mx-auto block rounded-full bg-customblue-100 text-center text-radiantgreen p-3'>{dummyData.timeStamp.toLocaleString()}</div>
            <div className="w-[150px] aspect-square mx-auto mt-10 overflow-hidden rounded-full">
                <img src={dummyData.image} alt="card-image" className="hover:scale-110 w-full h-full" />
            </div>
            <p className='pt-5'>From - {dummyData.fromAddress}</p>
            <p className='pt-2'>To - {dummyData.toAddress}</p>
            <p className='pt-6'>{dummyData.amount} {dummyData.currency}</p>
        </div>
    )
}
