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
    const [scrollEnd, setScrollEnd] = useState(false);

    const slide = (shift: number) => {
        if (scroll.current) {
            console.log(scroll.current.scrollLeft);
            scroll.current.scrollLeft += shift;

            setScrollx(scrollx + shift);

            if (
                Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <=
                scroll.current.offsetWidth
            ) {
                setScrollEnd(true);
            } else {
                setScrollEnd(false);
            }
        }
    };

    const scrollCheck = () => {
        if (scroll.current) {
            setScrollx(scroll.current.scrollLeft);
            if (
                Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <=
                scroll.current.offsetWidth
            ) {
                setScrollEnd(true);
            } else {
                setScrollEnd(false);
            }
        }
    };

    const dummyData = {
        transcations: [1, 2, 3, 4, 5, 6, 7, 8],
    }

    const transactionCards = dummyData.transcations.map(
        transaction =>
            <li key={transaction} className={props.scrollType === 'vertical' ? 'block' : 'inline-block'}>
                <TransactionCard transactionId={transaction} />
            </li>
    )

    const horizontalScroll = "overflow-x-auto whitespace-nowrap no-scrollbar";
    const verticalScroll = "flex justify-center flex-wrap";

    return (
        <div className="my-16 relative">
            <h3 className="text-xl md:text-2xl lg:text-4xl italic mb-10">{props.title}</h3>
            {props.scrollType === 'horizontal' &&
                <div className="absolute top-2 right-0">
                    <button
                        className="prev border border-white rounded-md p-1.5 mr-4"
                        onClick={() => slide(-90)}
                    >
                        <img src={ForwardArrowIcon} alt="prev" className="rotate-180" />
                    </button>
                    <button
                        className="next border border-white rounded-md p-1.5"
                        onClick={() => slide(+90)}
                    >
                        <img src={ForwardArrowIcon} alt="prev"/>
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

