import { useState } from "react"

interface NotificationBarProps {
    message: string,
    showNotification: boolean,
}

export default function NotificationBar(props: NotificationBarProps) {
    return (
        <>
            {
                props.showNotification &&
                <div className="bg-white py-4 px-10 relative">
                    {props.message}
                </div>
            }
        </>
    )
}
