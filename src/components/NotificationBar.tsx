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
                <div className="bg-white py-4 px-10 fixed w-full z-20 text-center">
                    {props.message}
                </div>
            }
        </>
    )
}
