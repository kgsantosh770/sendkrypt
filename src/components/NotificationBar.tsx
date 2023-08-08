import { useNotificationContext } from "../features/notification/NotificationContext"
import CloseIcon from "../assets/images/close.png"

export default function NotificationBar() {
    const notificaton = useNotificationContext();

    return (
        <>
            {
                notificaton.enabled &&
                <div className="bg-white py-4 px-10 fixed w-full z-20 text-center">
                    {notificaton.message}
                    <button
                        className="absolute right-6 top-1/4 w-7 p-1 border-2"
                        onClick={notificaton.hideNotification}
                    >
                        <img src={CloseIcon} alt="close" />
                    </button>
                </div>
            }
        </>
    )
}
