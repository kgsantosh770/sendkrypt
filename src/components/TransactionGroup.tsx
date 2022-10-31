import { useRef, useState } from "react"

import TransactionCard from "./TransactionCard"
import ForwardArrowIcon from "../assets/images/forward.png";

interface Props {
    title: string,
    scrollType: 'horizontal' | 'vertical',
}

TransactionGroup.defaultProps = {
    scrollType: 'vertical',
}

export default function TransactionGroup(props: Props) {

    let scroll = useRef<HTMLUListElement>(null);
    const [scrollx, setScrollx] = useState(0);

    const slide = (shift: number) => {
        if (scroll.current) {
            console.log(scroll.current.scrollLeft);
            scroll.current.scrollLeft += shift;

            setScrollx(scrollx + shift);
        }
    };

    const dummyData = {
        transcations: [1, 2, 3, 4, 5, 6, 7, 8],
    }

    const transactionCards = dummyData.transcations.map(
        transaction =>
            <li key={transaction} className={props.scrollType === 'vertical' ? 'block' : 'inline-block'}>
                <TransactionCard cardType={props.scrollType} transactionId={transaction} />
            </li>
    )

    const horizontalScroll = "overflow-x-auto whitespace-nowrap no-scrollbar";
    const verticalScroll = "grid grid-cols-3";

    return (
        <div className="my-16 relative">
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
                        <img src={ForwardArrowIcon} alt="next" className="w-5 h-5"/>
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

