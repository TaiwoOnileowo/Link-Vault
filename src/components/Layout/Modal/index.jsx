import React, { useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import { useAppContext } from "../../../context/AppContext";
import { MdOutlineCancel } from "react-icons/md";
import { useModal } from "../../../hooks";
const Modal = (props) => {
  const { children } = props;
  const { modalRef, isOpen, setIsOpen, modalText } = useAppContext();
  const { handleModalClose } = useModal();

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
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 w-full h-full">
      <div className="relative bg-lightBg dark:bg-darkAlt px-3 p-4 rounded-lg shadow-lg text-black max-w-[85%] max-h-[70%] scrollbar">
        <span
          className="text-black hover:text-black dark:text-dimWhite absolute top-0 right-0 cursor-pointer dark:hover:text-white"
          onClick={handleModalClose}
        >
          <MdOutlineCancel />
        </span>
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