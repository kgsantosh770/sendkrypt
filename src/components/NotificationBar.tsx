import { useState } from "react"

interface NotificationBarProps {
    message: string,
    showNotification: boolean,
}

export default function NotificationBar(props: NotificationBarProps) {
    const [showNotification, setShowNotification] = useState(props.showNotification);
    if (showNotification) {
        return (
            <div className="bg-white py-4 px-10 relative">
                {props.message}
                <button
                    onClick={()=>setShowNotification(true)}
                    className="absolute right-10 pb-2 rounded-full bg-customblue-200 w-7 h-7 text-white font-semibold"
                >
                    x
                </button>
            </div>
        )
    }
    return null;
}
