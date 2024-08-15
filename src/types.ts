import React from "react";
export interface Links {
  url: string;
  url_name: string;
  pinned?: boolean;
  selected?: boolean;
  originalIndex?: number;
}

export interface Folders {
  folder_name: string;
  links: Links[];
  pinned?: boolean;
  selected?: boolean;
  originalIndex?: number;
  folder_icon: string;
}

export interface Session {
  expires: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  referenceId?: string;
}
export interface ContextMenuType {
  visible: boolean;
  x: number;
  y: number;
  linkIndex: number | null;
}
export interface AppContextType {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;

  inputError: boolean;
  setInputError: React.Dispatch<React.SetStateAction<boolean>>;

  route: string;

  links: Links[];
  setLinks: React.Dispatch<React.SetStateAction<Links[]>>;
  menu: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;

  handleSearchInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  searchInput: string;

  setRoute: React.Dispatch<React.SetStateAction<string>>;

  folders: Folders[];
  setFolders: React.Dispatch<React.SetStateAction<Folders[]>>;

  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  showSignUpModal: boolean;
  setShowSignUpModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalDismissed: boolean;
  setModalDismissed: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface LinkContextProps {
  handleBulkCopyFolder: () => void;
  handleBulkDelete: (isModal?: boolean) => void;
  showCheckboxes: boolean;
  setShowCheckboxes: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelect: (index: number, isModal?: boolean) => void;
  handlePinClick: (index: number) => void;
  handleDelete: (index: number) => void;
  handleBulkCopy: () => void;
  handleCopyFolder: (index: number) => void;
  copiedIndex: number | null;
  setCopiedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  isFolder: boolean;
  isFolderLinks: boolean;
  setIsFolder: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFolderLinks: React.Dispatch<React.SetStateAction<boolean>>;
  handleCopyClick: (url: string, index: number) => void;
  handleBulkDeleteFolder: (isModal?: boolean) => void;
  handleSelectAllLinks: () => void;
  namedLinks: Links[];
  unnamedLinks: Links[];
  handleSelectAllFolders: () => void;
  handleSelectLinkInFolder: (index: number) => void;
  handleDeleteLinkInFolder: () => void;
  handleSelectAllLinksInFolder: () => void;
  handleSelectClick: (isSelectClick: boolean) => void;
  handleAddLinksToFolder: () => void;
  existingLinks: Links[];
  setExistingLinks: React.Dispatch<React.SetStateAction<Links[]>>;
}

export interface ModalContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalText: string;
  setModalText: React.Dispatch<React.SetStateAction<string>>;
  editIndex: number | null;
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
  inputs: Links;
  setInputs: React.Dispatch<React.SetStateAction<Links>>;
  folderInputs: Folders;
  setFolderInputs: React.Dispatch<React.SetStateAction<Folders>>;
  openModal: (
    modalText: string,
    linkDetails: Links | null,
    folderDetails: Folders | null,
    linkIndex: number | null,
    isFolder: boolean
  ) => void;
  handleClose: () => void;
  modalRef: React.MutableRefObject<HTMLDivElement>;
  folderDetails: Folders | null;
}
export interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface FolderContextType {
  showFolderCheckboxes: boolean;
  setShowFolderCheckboxes: React.Dispatch<React.SetStateAction<boolean>>;
  openFolderIndex: number | null;
  toggleFolder: (index: number) => void;
  setOpenFolderIndex: React.Dispatch<React.SetStateAction<number | null>>;
}
