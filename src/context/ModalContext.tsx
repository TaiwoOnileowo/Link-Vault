import React, { useState, createContext, useRef, ReactNode } from "react";
import { initialInputs, initialFolderInputs } from "../constants/initialStates";

import { ModalContextType, Links, Folders } from "../types";

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [inputs, setInputs] = useState<Links | null>(initialInputs);
  const [folderInputs, setFolderInputs] = useState<Folders | null>(
    initialFolderInputs
  );
  const [folderDetails, setFolderDetails] = useState<Folders | null>(null);
  const modalRef = useRef<any>();

  const openModal = (
    modalText: string,
    linkDetails: Links | null,
    folderDetails: Folders | null,
    linkIndex: number | null,
    isFolder: boolean
  ) => {
    modalRef.current?.open();
    setModalText(modalText);
    setInputs(initialInputs);
    setFolderInputs(initialFolderInputs);

    if (linkDetails || folderDetails) {
      if (isFolder) {
        setFolderInputs(folderDetails);
        setEditIndex(linkIndex);
        setFolderDetails(folderDetails);
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
