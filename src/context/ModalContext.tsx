import { useState, createContext, useRef, ReactNode, RefObject } from "react";
import { initialInputs, initialFolderInputs } from "../constants/initialStates";

interface LinkDetails {
  // Define the structure of linkDetails if it has more properties
  [key: string]: any;
}

interface ModalContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalText: string;
  setModalText: React.Dispatch<React.SetStateAction<string>>;
  editIndex: number | null;
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
  inputs: any;
  setInputs: React.Dispatch<React.SetStateAction<any>>;
  folderInputs: any;
  setFolderInputs: React.Dispatch<React.SetStateAction<any>>;
  openModal: (modalText: string, linkDetails: LinkDetails | null, linkIndex: number | null, isFolder: boolean) => void;
  handleClose: () => void;
  modalRef: RefObject<any>;
  folderDetails: any;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [inputs, setInputs] = useState(initialInputs);
  const [folderInputs, setFolderInputs] = useState(initialFolderInputs);
  const [folderDetails, setFolderDetails] = useState(null);
  const modalRef = useRef<any>();

  const openModal = (modalText: string, linkDetails: LinkDetails | null, linkIndex: number | null, isFolder: boolean) => {
    modalRef.current?.open();
    setModalText(modalText);
    setInputs(initialInputs);
    setFolderInputs(initialFolderInputs);

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
