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
}

export interface FolderInputs {
  links: Links[];
  folder_name: string;
  folder_icon: string;
  // Add other properties if any
}
export interface Session {
  expires: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
}

export interface AppContextType {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  hoveredLink: any; // replace `any` with appropriate type
  setHoveredLink: React.Dispatch<React.SetStateAction<any>>;
  folderDetails: any; // replace `any` with appropriate type
  previewLink: any; // replace `any` with appropriate type
  previewLinkRef: any; // replace `any` with appropriate type
  handleHover: any; // replace `any` with appropriate type
  handleHidePreviewLink: any; // replace `any` with appropriate type
  inputError: boolean;
  setInputError: React.Dispatch<React.SetStateAction<boolean>>;
  contextMenu: any; // replace `any` with appropriate type
  setContextMenu: React.Dispatch<React.SetStateAction<any>>;
  contextMenuRef: any; // replace `any` with appropriate type
  handleContextMenu: any; // replace `any` with appropriate type
  handleHideContextMenu: any; // replace `any` with appropriate type
  route: string;
  folderInputs: FolderInputs;
  setFolderInputs: React.Dispatch<React.SetStateAction<FolderInputs>>;
  inputs: any; // replace `any` with appropriate type
  setInputs: React.Dispatch<React.SetStateAction<any>>;
  modalText: string;
  modalRef: any; // replace `any` with appropriate type
  links: Links[];
  setLinks: React.Dispatch<React.SetStateAction<Links[]>>;
  menu: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  handleClose: any; // replace `any` with appropriate type
  editIndex: number | null;
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
  openModal: any; // replace `any` with appropriate type
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearchInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  searchInput: string;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setRoute: React.Dispatch<React.SetStateAction<string>>;
  setToggle: any; // replace `any` with appropriate type
  toggle: any; // replace `any` with appropriate type
  folders: Folders[];
  setFolders: React.Dispatch<React.SetStateAction<Folders[]>>;
  navRef: any; // replace `any` with appropriate type
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
  handleDeleteLinkInFolder: () => void;
  handleSelectAllLinksInFolder: () => void;
  handleSelectClick: (isSelectClick: boolean) => void;
  handleAddLinksToFolder: () => void;
  existingLinks: Links[];
  setExistingLinks: React.Dispatch<SetStateAction<Links[]>>;
}
