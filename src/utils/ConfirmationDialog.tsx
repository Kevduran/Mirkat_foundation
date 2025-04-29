import './ConfirmationDialog.css';

interface ConfirmationDialogProps {
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

function ConfirmationDialog({onClose, onConfirm, title, message }: ConfirmationDialogProps) {

    return (
        <div className="confirmation-dialog">
            <div className="confirmation-dialog-content">
                <h2 className="confirmation-title">{title}</h2>
                <p className="confirmation-message">{message}</p>
                <button onClick={onClose} className="confirmation-button">Cancel</button>
                <button onClick={onConfirm} className="confirmation-button">Confirm</button>
            </div>
        </div>
    );
}

export default ConfirmationDialog;