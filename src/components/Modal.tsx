import React from "react";
import ReactDOM from "react-dom";

type BackdropProps = {
  onConfirm: () => void;
};

const Backdrop: React.FC<BackdropProps> = ({ onConfirm }) => {
  return <div className="backdrop" onClick={onConfirm} />;
};

type OverlayProps = {
  children: React.ReactNode;
};

const ModalOverlay: React.FC<OverlayProps> = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal__content">{children}</div>
    </div>
  );
};

type ModalProps = BackdropProps & OverlayProps;

const portalElement = document.getElementById("overlays");

export const Modal: React.FC<ModalProps> = ({ children, onConfirm }) => {
  return (
    <>
      {portalElement &&
        ReactDOM.createPortal(
          <Backdrop onConfirm={onConfirm} />,
          portalElement
        )}
      {portalElement &&
        ReactDOM.createPortal(
          <ModalOverlay>{children}</ModalOverlay>,
          portalElement
        )}
      <ModalOverlay>{children}</ModalOverlay>
    </>
  );
};
