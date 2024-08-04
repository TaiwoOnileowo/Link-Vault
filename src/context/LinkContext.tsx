import {
  useState,
  createContext,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import {} from "../utils/api";
import { useAppContext } from "./index";
import { useFolderContext } from "./index";
import { copyToClipboard } from "../utils/clipboardUtils";
import { toggleSelection, toggleBulkSelection } from "../utils/selectionUtils";
import { togglePin } from "../utils/pinUtils";
import { handleBulkCopyItems } from "../utils/copyBulkItems";
import { handleBulkDeleteItems, handleDeleteItems } from "../utils/deleteUtils";

interface LinkContextProps {
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
  namedLinks: any[];
  unnamedLinks: any[];
  handleSelectAllFolders: () => void;
  handleDeleteLinkInFolder: () => void;
  handleSelectAllLinksInFolder: () => void;
  handleSelectClick: (isSelectClick: boolean) => void;
  handleAddLinksToFolder: () => void;
  existingLinks: any[];
  setExistingLinks: React.Dispatch<React.SetStateAction<any[]>>;
}

export const LinkContext = createContext<LinkContextProps | undefined>(
  undefined
);

interface LinkProviderProps {
  children: ReactNode;
}

export const LinkProvider = ({ children }: LinkProviderProps) => {
  const {
    menu,
    links,
    setLinks,
    openModal,
    folders,
    setFolders,
    modalText,
    handleClose,
    inputs,
    setInputs,
    route,
  } = useAppContext();
  const { setShowFolderCheckboxes, openFolderIndex } = useFolderContext();
  const unnamedLinks = links.filter((link) => !link.url_name);
  const namedLinks = links.filter((link) => link.url_name);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [isFolder, setIsFolder] = useState(route === "Folder");
  const [isFolderLinks, setIsFolderLinks] = useState(false);
  const [existingLinks, setExistingLinks] = useState(links);

  useEffect(() => {
    setExistingLinks(links);
  }, [links]);

  ////////////// COPY LOGIC START /////////////
  const handleCopyClick = (url: string, index: number) => {
    setCopiedIndex(index);
    copyToClipboard(url);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 3000);
  };

  const handleCopyFolder = (index: number) => {
    const linksInFolder = folders[index].links;
    const joinedLinks = linksInFolder.map((link: any) => link.url).join("\n");
    if (linksInFolder.length) {
      copyToClipboard(joinedLinks);
    }
  };
  const handleBulkCopy = useCallback(() => {
    if (isFolderLinks) {
      handleBulkCopyItems(folders, setFolders, "link", openFolderIndex, true);
      setShowCheckboxes(false);
    } else {
      handleBulkCopyItems(links, setLinks, "link");
      setShowCheckboxes(false);
    }
  }, [folders, links, isFolderLinks, openFolderIndex, setFolders, setLinks]);
  const handleBulkCopyFolder = useCallback(() => {
    handleBulkCopyItems(folders, setFolders, "folder");
    setShowFolderCheckboxes(false);
  }, [folders, setShowFolderCheckboxes, setFolders]);

  ////////////// COPY LOGIC END /////////////

  ///////// DELETE LOGIC START ////////////
  const handleDelete = useCallback(
    (index: number) => {
      if (isFolder) {
        handleDeleteItems(folders, setFolders, index);
      } else if (isFolderLinks) {
        const updatedFolders = [...folders];
        updatedFolders[openFolderIndex].links.splice(index, 1);

        setFolders(updatedFolders);
      } else {
        handleDeleteItems(links, setLinks, index);
      }
      toast.success("Deleted");
    },
    [
      isFolder,
      isFolderLinks,
      openFolderIndex,
      folders,
      links,
      setFolders,
      setLinks,
    ]
  );
  const handleBulkDelete = useCallback(
    (isModal?: boolean) => {
      const filterCriteria = (link: any) =>
        menu === "Unnamed"
          ? !link.url_name && link.selected
          : link.url_name && link.selected;

      handleBulkDeleteItems(
        menu === "Unnamed" ? unnamedLinks : namedLinks,
        links,
        setLinks,
        filterCriteria,
        openModal,
        menu,
        isModal && isModal
      );

      setShowCheckboxes(false);
    },
    [
      links,
      namedLinks,
      unnamedLinks,
      setLinks,
      openModal,
      setShowCheckboxes,
      menu,
    ]
  );
  const handleDeleteLinkInFolder = () => {
    const filterCriteria = (link: {
      selected?: boolean;
      url_name?: string;
      url?: string;
    }) => link.selected || false;
    handleBulkDeleteItems(
      folders[openFolderIndex].links,
      null,
      (newLinks: any[]) => {
        const newFolders = [...folders];
        newFolders[openFolderIndex].links = newLinks;
        setFolders(newFolders);
      },
      filterCriteria,
      openModal,
      null,
      true
    );
    setShowCheckboxes(false);
  };

  const handleBulkDeleteFolder = useCallback(
    (isModal?: boolean) => {
      const filterCriteria = (folder: any) => folder.selected;

      handleBulkDeleteItems(
        folders,
        null,
        setFolders,

        filterCriteria,
        openModal,
        null,
        isModal && isModal
      );

      setShowFolderCheckboxes(false);
      setIsFolderLinks(false);
    },
    [folders, setFolders, openModal, setShowFolderCheckboxes]
  );
  ////////////// DELETE LOGIC END /////////////

  ////////////// PIN LOGIC START /////////////
  const handlePinClick = useCallback(
    (index: number) => {
      console.log(isFolder);
      if (isFolder) {
        setFolders((prevFolders) => {
          const updatedFolders = togglePin(prevFolders, index);

          return updatedFolders;
        });
      } else {
        setLinks((prevLinks) => {
          const updatedLinks = togglePin(prevLinks, index);

          return updatedLinks;
        });
      }
    },
    [setLinks, setFolders, isFolder]
  );
  ////////////// PIN LOGIC END /////////////

  ////// SELECT LOGIC START ///////////
  const handleSelect = (index: number, isModal?: boolean) => {
    if ((isFolder && !modalText.includes("Folder")) || isModal) {
      console.log("Folder selection");
      setFolders((prevFolders: Array<any>) => {
        const newFolders = toggleSelection(prevFolders, index, true, null);
        console.log("After folder selection:", newFolders);
        return newFolders;
      });
    } else if (isFolderLinks && !modalText.includes("Folder")) {
      console.log("Link selection inside folder");
      setFolders((prevFolders: Array<any>) => {
        const newFolders = toggleSelection(
          prevFolders,
          index,
          false,
          openFolderIndex
        );
        console.log("After link selection inside folder:", newFolders);
        return newFolders;
      });
    } else {
      if (isFolder) {
        setExistingLinks((prevLinks) => {
          const newLinks = toggleSelection(prevLinks, index, true, null);
          console.log("After global link selection:", newLinks);
          return newLinks;
        });
      } else {
        setLinks((prevLinks) => {
          const newLinks = toggleSelection(prevLinks, index);
          console.log("After global link selection:", newLinks);
          return newLinks;
        });
      }
    }
  };

  const handleSelectAllLinksInFolder = () => {
    const updatedFolders = toggleBulkSelection(
      folders,
      false,
      null,
      false,
      true,
      openFolderIndex
    );
    console.log(openFolderIndex, updatedFolders, "dax");
    setFolders(updatedFolders);
    setIsFolder(false);
  };

  const handleSelectAllFolders = () => {
    const updatedFolders = toggleBulkSelection(
      folders,
      false,
      null,
      true,
      false,
      null
    );
    setFolders(updatedFolders);
    console.log("Updated folders:", updatedFolders);
  };

  const handleSelectAllLinks = () => {
    const updatedLinks = toggleBulkSelection(
      menu === "Named" ? namedLinks : unnamedLinks,
      false,
      menu,
      false,
      false,
      null
    );
    let update: Array<any> = [];
    if (menu === "Named") {
      update = [...unnamedLinks, ...updatedLinks];
    } else {
      update = [...namedLinks, ...updatedLinks];
    }
    setLinks(update);
  };
  const handleSelectClick = (isSelectClick: boolean) => {
    if (isFolderLinks) {
      // Handle selection for links within a specific folder
      const updatedFolders = toggleBulkSelection(
        folders,
        isSelectClick,
        null,
        false,
        true,
        openFolderIndex
      );
      setFolders(updatedFolders);

      setIsFolder(false);
    } else if (isFolder) {
      // Handle selection for folders
      const updatedFolders = toggleBulkSelection(
        folders,
        isSelectClick,
        null,
        true,
        false,
        null
      );
      setFolders(updatedFolders);
    } else {
      // Handle selection for global links
      const updatedLinks = toggleBulkSelection(
        links,
        isSelectClick,
        null,
        false,
        false,
        null
      );
      setLinks(updatedLinks);
    }
  };
  ////////// SELECT LOGIC END ///////////

  /////////////// ADD LINKS TO FOLDER LOGIC START /////////////
  const handleAddLinksToFolder = () => {
    let linksToAdd: Array<any> = [];
    if (inputs.selected) {
      linksToAdd = [{ ...inputs, selected: false }];
    } else {
      linksToAdd = links
        .filter((link: any) => link.selected)
        .map((link: any) => {
          return { ...link, selected: false };
        });
    }

    const updatedFolders = folders.map((folder: any) => {
      if (folder.selected) {
        folder.links = [...linksToAdd, ...folder.links];
      }
      return folder;
    });

    const updatedLinks = [...links];
    linksToAdd.forEach((link: any) => {
      const index = updatedLinks.findIndex((l: any) => l.url === link.url);
      if (index !== -1) {
        updatedLinks.splice(index, 1);
      }
    });

    setShowCheckboxes(false);
    const deselectedFolders = toggleBulkSelection(
      updatedFolders,
      true,
      null,
      true,
      false,
      null
    );

    if (!inputs.selected) {
      setLinks(updatedLinks);
    }
    setFolders(deselectedFolders);

    setInputs({
      url: "",
      url_name: "",
      tags: "",
    });
    handleClose();
  };

  /////////////// ADD LINKS  TO FOLDER LOGIC END /////////////

  return (
    <LinkContext.Provider
      value={{
        handleBulkCopyFolder,
        handleBulkDelete,
        showCheckboxes,
        setShowCheckboxes,
        handleSelect,
        handlePinClick,
        handleDelete,
        handleBulkCopy,
        handleCopyFolder,
        copiedIndex,
        setCopiedIndex,
        isFolder,
        isFolderLinks,
        setIsFolder,
        setIsFolderLinks,
        handleCopyClick,
        handleBulkDeleteFolder,
        handleSelectAllLinks,
        namedLinks,
        unnamedLinks,
        handleSelectAllFolders,
        handleDeleteLinkInFolder,
        handleSelectAllLinksInFolder,
        handleSelectClick,
        handleAddLinksToFolder,
        existingLinks,
        setExistingLinks,
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};
