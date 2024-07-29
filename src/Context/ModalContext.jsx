import { useState, createContext, useRef } from "react";
import { initialInputs, initialFolderInputs } from "../constants/initialStates";
import proptype from "prop-types";
export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  ModalProvider.propTypes = {
    children: proptype.node.isRequired,
  };
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [inputs, setInputs] = useState(initialInputs);
  const [folderInputs, setFolderInputs] = useState(initialFolderInputs);
  const [folderDetails, setFolderDetails] = useState(null);
  const modalRef = useRef();

  const openModal = (modalText, linkDetails, linkIndex, isFolder) => {
    modalRef.current.open();
    setModalText(modalText);
    setInputs(initialInputs);
    setFolderInputs(initialFolderInputs);
    console.log(linkDetails)
    console.log(linkIndex)
    if (linkDetails) {
      if (isFolder) {
        setFolderInputs(linkDetails);
        setEditIndex(linkIndex);
        setFolderDetails(linkDetails);
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
        folderDetails,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
