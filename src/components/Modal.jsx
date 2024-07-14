import React, { useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import { useAppContext } from "../Context/AppContext";

const Modal = (props) => {
  const { children } = props;
  const { modalRef, isOpen, setIsOpen, modalText } = useAppContext();

  useImperativeHandle(modalRef, () => ({
    open() {
      setIsOpen(true);
    },
    close() {
      setIsOpen(false);
    },
  }));

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full h-full">
      <div className="relative bg-white dark:bg-darkAlt p-6 py-4 rounded-lg shadow-lg text-black max-w-md">
        <h1 className="text-xl font-bold text-black dark:text-white text-center mb-3">
          {modalText}
        </h1>
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
