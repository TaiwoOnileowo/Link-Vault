import React, { useState, createContext, useRef, ReactNode } from "react";
import { initialInputs, initialFolderInputs } from "../constants/initialStates";
import { useModal } from "../components/ui/AnimatedModal";
import { ModalContextType, Links, Folders, AppContextType } from "../types";
import { useContextMenu } from "../hooks";
import { ContextMenuType } from "../types";
import { initialContextMenu } from "../constants/initialStates";
import { useAppContext } from ".";
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
  const [contextMenu, setContextMenu] =
    useState<ContextMenuType>(initialContextMenu);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const { links } = useAppContext() as AppContextType;
  const modalRef = useRef<any>();
  const { setOpen } = useModal();
  const openModal = (
    modalText: string,
    linkDetails: Links | null,
    folderDetails: Folders | null,
    linkIndex: number | null,
    isFolder: boolean
  ) => {
    // modalRef.current?.open();
    setOpen(true); //openModal
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

  const openLinkModal = (modalText: string, index: number | null) => {
    setOpen(true); //openModal
    setModalText(modalText); //set modal text
    if (index) {
      setClickedIndex(index); //set clicked index to the index of the link that prompted the modal
      setInputs(links[index]); //set inputs to the link at the clicked index
    }
  };
  const openFolderModal = (modalText: string, index: number | null) => {
    setOpen(true); //openModal
    setModalText(modalText); //set modal text
    setFolderInputs(initialFolderInputs);
  };
  const handleClose = () => {
    setOpen(false); //close modal
    setInputs(initialInputs); //clear inputs
    setFolderInputs(initialFolderInputs);
    setModalText("");
  };

  return (
    <ModalContext.Provider
      value={{
        openLinkModal,
        openFolderModal,
        clickedIndex,
        contextMenu,
        setContextMenu,
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
