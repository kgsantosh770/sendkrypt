import { useRef, useState } from "react"
import TransactionCard from "./TransactionCard"

interface Props {
    title: string,
    scrollType: 'horizontal' | 'vertical',
}

TransactionGroup.defaultProps = {
    scrollType: 'vertical',
}

export default function TransactionGroup(props: Props) {

    // let scroll = useRef<HTMLUListElement>(null);
    // const [scrollx, setScrollx] = useState(0);
    // const [scrollEnd, setScrollEnd] = useState(false);

    // const slide = (shift: number) => {
    //     if (scroll.current) {
    //         scroll.current.scrollLeft += shift;

    //         setScrollx(scrollX + shift);

    //         if (
    //             Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <=
    //             scroll.current.offsetWidth
    //         ) {
    //             setScrollEnd(true);
    //         } else {
    //             setScrollEnd(false);
    //         }
    //     }
    // };

    // const scrollCheck = () => {
    //     if (scroll.current) {
    //         setScrollx(scroll.current.scrollLeft);
    //         if (
    //             Math.floor(scroll.current.scrollWidth - scroll.current.scrollLeft) <=
    //             scroll.current.offsetWidth
    //         ) {
    //             setScrollEnd(true);
    //         } else {
    //             setScrollEnd(false);
    //         }
    //     }
    // };

    const dummyData = {
        transcations: [1, 2, 3, 4, 5, 6, 7, 8],
    }

    const transactionCards = dummyData.transcations.map(
        transaction =>
            <li className={props.scrollType === 'vertical' ? 'block' : 'inline-block'}>
                <TransactionCard transactionId={transaction} />
            </li>
    )

    const horizontalScroll = "overflow-x-auto whitespace-nowrap no-scrollbar";
    const verticalScroll = "flex justify-center flex-wrap";

    return (
        <div className="my-16">
            {/* <button
                className="prev"
                onClick={() => slide(-50)}
            >
                <i className="fa fa-angle-left"></i>
            </button>
            <button
                className="next"
                onClick={() => slide(+50)}
            >
                <i className="fa fa-angle-right"></i>
            </button> */}

            <h3 className="text-xl md:text-2xl lg:text-4xl italic mb-20">{props.title}</h3>
            <ul
                // ref={scroll}
                className={props.scrollType === 'vertical' ? verticalScroll : horizontalScroll}>
                {transactionCards}
            </ul>
        </div>
    )
}

