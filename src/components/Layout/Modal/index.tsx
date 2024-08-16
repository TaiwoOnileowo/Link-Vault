// import React, { useImperativeHandle } from "react";
// import { createPortal } from "react-dom";
// import { useAppContext, useModalContext } from "../../../context";
// import { MdOutlineCancel } from "react-icons/md";
// import { useModal } from "../../../hooks";
// import propTypes from "prop-types";
// import { AppContextType, ModalContextType } from "../../../types";
// const Modal: React.FC<{ children: React.ReactNode }> = (props) => {
//   const { children } = props;
//   Modal.propTypes = {
//     children: propTypes.node.isRequired,
//   };
//   const { modalRef, isOpen, setIsOpen, modalText } =
//     useModalContext() as ModalContextType;
//   const { handleModalClose } = useModal();

//   useImperativeHandle(modalRef, () => ({
//     open() {
//       setIsOpen(true);
//     },
//     close() {
//       setIsOpen(false);
//     },
//   }));

//   if (!isOpen) return null;

//   return createPortal(
//     <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 w-full h-full">
//       <div className="relative bg-white dark:bg-d-darkGray px-3 p-4 rounded-lg shadow-lg text-black max-w-[88%] max-h-[70%] scrollbar">
//         <span
//           className="text-primary-2 hover:text-hoverBlue dark:text-dimWhite absolute top-0 right-0 cursor-pointer dark:hover:text-white"
//           onClick={handleModalClose}
//         >
//           <MdOutlineCancel />
//         </span>
//         <h1 className="text-xl font-bold text-primary-2 dark:text-d-lightGray text-center mb-3">
//           {modalText}
//         </h1>
//         {children}
//       </div>
//     </div>,
//     document.getElementById("modal")
//   );
// };

// export default Modal;

import React from "react";
import { ModalBody, ModalContent } from "../../ui/AnimatedModal.js";
import { useModalContext } from "../../../context/index.js";
import { ModalContextType } from "../../../types.js";
const Modal = ({ children }) => {
  const { modalText } = useModalContext() as ModalContextType;
  return (
    <ModalBody>
      <ModalContent>
        <h1 className="text-2xl font-bold text-primary-2 dark:text-d-lightGray text-center mb-2">
          {modalText}{" "}
        </h1>
        {children}
      </ModalContent>
    </ModalBody>
  );
};

export default Modal;
