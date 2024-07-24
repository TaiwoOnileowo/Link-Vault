import { useState, useContext, createContext, useRef } from "react";
import { initialInputs, initialFolderInputs } from "../constants/initialStates";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [inputs, setInputs] = useState(initialInputs);
  const [folderInputs, setFolderInputs] = useState(initialFolderInputs);
  const modalRef = useRef();

  const openModal = (modalText, linkDetails, linkIndex, isFolder) => {
    modalRef.current.open();
    setModalText(modalText);
    setInputs(initialInputs);
    setFolderInputs(initialFolderInputs);

    if (linkDetails) {
      if (isFolder) {
        setFolderInputs(linkDetails);
        setEditIndex(linkIndex);
      } else {
        setInputs(linkDetails);
        setEditIndex(linkIndex);
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setInputs(initialInputs);
    setFolderInputs(initialFolderInputs);
    setModalText("");
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        modalText,
        setModalText,
        editIndex,
        setEditIndex,
        inputs,
        setInputs,
        folderInputs,
        setFolderInputs,
        openModal,
        handleClose,
        modalRef,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
