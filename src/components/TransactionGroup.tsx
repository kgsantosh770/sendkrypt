import { useRef, useState } from "react"

import TransactionCard from "./TransactionCard"
import ForwardArrowIcon from "../assets/images/forward.png";
import { ethers } from "ethers";

interface Props {
    title: string,
    id?: string,
    scrollType: 'horizontal' | 'vertical',
    transactions: ethers.Event[],
}

TransactionGroup.defaultProps = {
    scrollType: 'vertical',
    id: 'transactions',
}

export default function TransactionGroup(props: Props) {
    let scroll = useRef<HTMLUListElement>(null);
    const [scrollx, setScrollx] = useState(0);

    const slide = (shift: number) => {
        if (scroll.current) {
            scroll.current.scrollLeft += shift;
            setScrollx(scrollx + shift);
        }
    };

    const transactionCards = props.transactions.map(
        (transaction, index) => {
            index = index+1;
            let justifyClasses;
            if(index % 3 === 1 || index === 0){
                justifyClasses = "justify-self-start";
            }
            else if(index % 3 === 0 && index !== 0){
                justifyClasses = "justify-self-end";
            }
            return (
                <li key={index} className={`flex ${justifyClasses}`}>
                    <TransactionCard cardType={props.scrollType} transaction={transaction} />
                </li>
            )
        }
    )

    const horizontalScroll = "flex overflow-x-auto whitespace-nowrap no-scrollbar";
    const verticalScroll = "grid grid-cols-3";

    return (
        <div className="my-16 relative scroll-mt-10" id={props.id}>
            <h3 className="text-xl md:text-2xl lg:text-4xl italic mb-10">{props.title}</h3>
            {props.scrollType === 'horizontal' &&
                <div className="absolute top-2 right-0">
                    <button
                        className="prev bg-white rounded-md p-1.5 mr-4"
                        onClick={() => slide(-90)}
                    >
                        <img src={ForwardArrowIcon} alt="prev" className="rotate-180 w-5 h-5" />
                    </button>
                    <button
                        className="next bg-white rounded-md p-1.5"
                        onClick={() => slide(+90)}
                    >
                        <img src={ForwardArrowIcon} alt="next" className="w-5 h-5" />
                    </button>
                </div>
            }

            <ul
                ref={scroll}
                className={props.scrollType === 'vertical' ? verticalScroll : horizontalScroll}>
                {transactionCards}
            </ul>
        </div>
    )
}

