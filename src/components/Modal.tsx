import { createPortal } from "react-dom";
import "../styles/Modal.scss";
import { FaTimes as CancelIcon } from "react-icons/fa";

type TModalProps = {
  isModalOpen: boolean;
  onModalClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<TModalProps> = ({
  isModalOpen,
  onModalClose,
  children,
}) => {
  if (!isModalOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onModalClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onModalClose}>
          <CancelIcon />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};
