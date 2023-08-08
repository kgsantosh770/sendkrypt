import { ReactNode, createContext, useContext, useState } from "react";

interface INotificationState {
    message: string,
    enabled: boolean,
    showNotification: (msg: string) => void,
    hideNotification: () => void,
}

const initialState: INotificationState = {
    message: '',
    enabled: false,
    showNotification: () => { },
    hideNotification: () => { },
}

const NotificationContext = createContext<INotificationState>(initialState);

function NotificationProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState(initialState.message);
    const [enabled, setEnabled] = useState(initialState.enabled);

    const showNotification = (msg: string) => {
        if (msg !== '') {
            setMessage(msg);
            setEnabled(true);
        }
    }

    const hideNotification = () => {
        setMessage('');
        setEnabled(false);
    }

    return (
        <NotificationContext.Provider value={{ message, enabled, showNotification, hideNotification}} >
            {children}
        </NotificationContext.Provider>
    )
}

const useNotificationContext = () => {
    return useContext(NotificationContext);
}

export { NotificationProvider, useNotificationContext }