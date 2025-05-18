import { useEffect } from 'react';
import './PopupMessage.css'

interface PopupMessageProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    duration: number;
}

function PopupMessage({message, isVisible, onClose, duration}: PopupMessageProps) {

    useEffect(() => {
        if(isVisible) {
            const time = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(time);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) {
        return null;
    }

    return (
        <>
        <div className='message-container'>
            <p className='message'>{message}</p>
        </div>
        </>
    )
}

export default PopupMessage;