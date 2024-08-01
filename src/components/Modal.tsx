import { createPortal } from "react-dom";
import "../styles/Modal.scss";
import { FaTimes as CancelIcon } from "react-icons/fa";

type TModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<TModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <CancelIcon />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};
