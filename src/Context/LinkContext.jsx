import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import { useAppContext } from "./AppContext";
import { useFolderContext } from "./FolderContext";
const Context = createContext();

export const LinkContext = ({ children }) => {
  const { links, setLinks, openModal, folders, setFolders, modalText } =
    useAppContext();
  const {
    setShowFolderCheckboxes,
    index: folderIndex,

    // setShowFolderLinkCheckboxes,
  } = useFolderContext();
  const [copiedIndex, setCopiedIndex] = useState(null);

  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [isFolder, setIsFolder] = useState(false);
  const [isFolderLinks, setIsFolderLinks] = useState(false);

  const unnamedLinks = links
    .filter((link) => !link.url_name)
    .filter((link) => !link.folder_name);
  const namedLinks = links
    .filter((link) => link.url_name)
    .filter((link) => !link.folder_name);

  const sortedUnnamedLinks = unnamedLinks.sort(
    (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
  );
  const sortedNamedLinks = namedLinks.sort(
    (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
  );

  const handleCopyClick = (url, index) => {
    setCopiedIndex(index);
    handleCopyToClipboard(url);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 3000);
  };

  const handleCopyToClipboard = useCallback(
    async (url) => {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Copied to clipboard");
      } catch (err) {
        toast.error("Failed to copy to clipboard");
      }
    },
    [links]
  );
  const handleCopyFolder = (index) => {
    const linksInFolder = folders[index].links;
    const joinedLinks = linksInFolder.map((link) => link.url).join("\n");
    if (linksInFolder.length) {
      handleCopyToClipboard(joinedLinks);
    }
  };

  const handleBulkCopy = useCallback(() => {
    if (isFolderLinks) {
      const selectedLinks = folders[folderIndex].links.filter(
        (link) => link.selected
      );
      const selectedUrls = selectedLinks.map((link) => link.url).join("\n");
      if (selectedLinks.length > 0) {
        handleCopyToClipboard(selectedUrls);
        setShowCheckboxes(false);
        setFolders((prevFolders) =>
          prevFolders.map((folder, i) => {
            if (i === folderIndex) {
              return {
                ...folder,
                links: folder.links.map((link) => {
                  return { ...link, selected: !link.selected };
                }),
              };
            }
            return folder;
          })
        );
      }
    } else {
      const selectedLinks = links.filter((link) => link.selected);
      const selectedUrls = selectedLinks.map((link) => link.url).join("\n");
      if (selectedLinks.length > 0) {
        handleCopyToClipboard(selectedUrls);
        setShowCheckboxes(false);
        setLinks((prevLinks) =>
          prevLinks.map((link) => {
            const newLink = { ...link };
            delete newLink.selected;
            return newLink;
          })
        );
      }
    }
  }, [links, handleCopyToClipboard, isFolderLinks]);
  const handleBulkCopyFolder = useCallback(() => {
    const selectedFolders = folders.filter((folder) => folder.selected);
    const selectedFolderUrls = selectedFolders
      .map((link) => link.links.map((l) => l.url))
      .join("\n");
    if (selectedFolderUrls.length > 0) {
      handleCopyToClipboard(selectedFolderUrls);
      setShowFolderCheckboxes(false);
      setFolders((prevFolders) =>
        prevFolders.map((folder) => {
          const newFolder = { ...folder };
          delete newFolder.selected;
          return newFolder;
        })
      );
    }
  }, [folders, handleCopyToClipboard]);

  const handleDelete = useCallback(
    (index, folderIndex, isFolder, isFolderLinks) => {
      if (isFolder) {
        console.log("hey");
        setFolders((prevFolders) => {
          const newFolders = [...prevFolders];
          newFolders.splice(index, 1);
          localStorage.setItem("Folders", JSON.stringify(newFolders));

          return newFolders;
        });
      } else if (isFolderLinks) {
        const newFolders = [...folders];
        newFolders[folderIndex].links.splice(index, 1);
        setFolders(newFolders);
        localStorage.setItem("Folders", JSON.stringify(newFolders));
      } else {
        setLinks((prevLinks) => {
          console.log("h");
          const newLinks = [...prevLinks];
          newLinks.splice(index, 1);
          localStorage.setItem("Links", JSON.stringify(newLinks));
          return newLinks;
        });
      }
      toast.success("Deleted");
    },
    [setLinks, setFolders]
  );

  const handlePinClick = useCallback(
    (index, isFolder) => {
      if (isFolder) {
        setFolders((prevFolders) => {
          const updatedFolders = [...prevFolders];
          const folder = { ...updatedFolders[index] };

          if (folder.originalIndex === undefined) {
            folder.originalIndex = index;
          }

          if (folder.pinned) {
            delete folder.pinned;
            const originalIndex = folder.originalIndex;
            updatedFolders.splice(index, 1);
            updatedFolders.splice(originalIndex, 0, folder);
            delete folder.originalIndex;
          } else {
            folder.pinned = true;

            updatedFolders.splice(index, 1);
            updatedFolders.unshift(folder);
          }

          localStorage.setItem("Folders", JSON.stringify(updatedFolders));
          // toast.success(folder.pinned ? "Pinned" : "Unpinned");
          return updatedFolders;
        });
      } else {
        setLinks((prevLinks) => {
          const updatedLinks = [...prevLinks];
          const link = { ...updatedLinks[index] };

          // Check if link has been pinned before
          if (link.originalIndex === undefined) {
            // First time pinning: store originalIndex
            link.originalIndex = index;
          }

          if (link.pinned) {
            // Unpin: remove the pinned property
            delete link.pinned;

            // Move the link back to its original position
            const originalIndex = link.originalIndex;
            updatedLinks.splice(index, 1);
            updatedLinks.splice(originalIndex, 0, link);
            delete link.originalIndex;
          } else {
            // Pin: add the pinned property
            link.pinned = true;
            // Move the pinned link to the top
            updatedLinks.splice(index, 1);
            updatedLinks.unshift(link);
          }

          localStorage.setItem("Links", JSON.stringify(updatedLinks));
          toast.success(link.pinned ? "Pinned" : "Unpinned");
          return updatedLinks;
        });
      }
    },
    [setLinks, setFolders]
  );

  const handleSelect = (index, isFolder) => {
    if (isFolder && !modalText.includes("Folder")) {
      setFolders((prevFolders) => {
        const updatedFolders = [...prevFolders];
        const folder = { ...updatedFolders[index] };

        if (folder.selected) {
          delete folder.selected;
        } else {
          folder.selected = true;
        }

        updatedFolders[index] = folder;
        return updatedFolders;
      });
    } else if (isFolderLinks && !modalText.includes("Folder")) {
      const updatedFolders = [...folders];
      const link = { ...updatedFolders[folderIndex].links[index] };
      if (link.selected) {
        delete link.selected;
      } else {
        link.selected = true;
      }
      updatedFolders[folderIndex].links[index] = link;
      setFolders(updatedFolders);
    } else {
      setLinks((prevLinks) => {
        const updatedLinks = [...prevLinks];
        const link = { ...updatedLinks[index] };

        if (link.selected) {
          delete link.selected;
        } else {
          link.selected = true;
        }

        updatedLinks[index] = link;
        return updatedLinks;
      });
    }
  };

  const handleSelectAll = (menu) => {
    let updatedLinks = [...links];
    if (menu === "Unnamed") {
      const allSelected = sortedUnnamedLinks.every((link) => link.selected);
      const selectedUnnamedLinks = sortedUnnamedLinks.map((link) => {
        return { ...link, selected: !allSelected };
      });

      updatedLinks = [...sortedNamedLinks, ...selectedUnnamedLinks];
    } else {
      const allSelected = sortedNamedLinks.every((link) => link.selected);
      const selectedNamedLinks = sortedNamedLinks.map((link) => {
        return { ...link, selected: !allSelected };
      });
      updatedLinks = [...selectedNamedLinks, ...sortedUnnamedLinks];
    }
    setLinks(updatedLinks);
  };
  const handleSelectAllLinksInFolder = () => {
    const updatedFolders = [...folders];
    const allSelected = folders[folderIndex].links.every(
      (link) => link.selected
    );
    const selectedLinks = folders[folderIndex].links.map((link) => {
      return { ...link, selected: !allSelected };
    });
    updatedFolders[folderIndex].links = selectedLinks;
    setFolders(updatedFolders);
    setIsFolder(false);
    setIsFolderLinks(false);
  };
  const handleSelectAllFolders = () => {
    let updatedFolders = [...folders];
    const allSelected = folders.every((folder) => folder.selected);
    const selectedFolders = folders.map((folder) => {
      return { ...folder, selected: !allSelected };
    });
    updatedFolders = [...selectedFolders];

    setFolders(updatedFolders);
  };

  const handleBulkDelete = useCallback(
    (menu) => {
      const linksInMenu = links.filter((link) =>
        menu === "Unnamed" ? !link.url_name : link.url_name
      );
      const linksSelectedInMenu = linksInMenu.filter((link) => link.selected);

      if (linksSelectedInMenu.length > 0) {
        if (linksSelectedInMenu.length === linksInMenu.length) {
          openModal(`Delete All ${menu} Links`, null, null);
        } else {
          const linksToKeep = links.filter((link) => {
            if (menu === "Unnamed" && !link.url_name) {
              return !link.selected;
            } else if (menu === "Named" && link.url_name) {
              return !link.selected;
            }
            return true;
          });

          setLinks(linksToKeep);
          localStorage.setItem("Links", JSON.stringify(linksToKeep));
          setShowCheckboxes(false);
          setLinks((prevLinks) =>
            prevLinks.map((link) => {
              const newLink = { ...link };
              delete newLink.selected;
              return newLink;
            })
          );
          toast.success("Deleted");
        }
      }
    },
    [links, setLinks, openModal, setShowCheckboxes]
  );
  const handleDeleteLinkInFolder = () => {
    const newFolders = [...folders];
    newFolders[folderIndex].links = newFolders[folderIndex].links.filter(
      (link) => !link.selected
    );
    setFolders(newFolders);
    localStorage.setItem("Folders", JSON.stringify(newFolders));
    toast.success("Deleted");
  };
  const handleBulkDeleteFolder = useCallback(() => {
    const selectedFolders = folders.filter((folder) => folder.selected);

    if (selectedFolders.length > 0) {
      if (selectedFolders.length === folders.length) {
        openModal(`Delete All Folders`, null, null);
      } else {
        const foldersToKeep = folders.filter((folder) => {
          return !folder.selected;
        });

        setFolders(foldersToKeep);
        localStorage.setItem("Folders", JSON.stringify(foldersToKeep));
        setShowFolderCheckboxes(false);
        setFolders((prevFolders) =>
          prevFolders.map((folder) => {
            const newFolder = { ...folder };
            delete newFolder.selected;
            return newFolder;
          })
        );
        toast.success("Deleted");
        setIsFolder(false);
        setIsFolderLinks(false);
      }
    }
  }, [folders, setFolders, openModal, setShowFolderCheckboxes]);

  const handleCancelSelect = (isFolder) => {
    if (isFolder) {
      setShowFolderCheckboxes(false);
      setFolders((prevFolders) =>
        prevFolders.map((folder) => {
          const newFolder = { ...folder };
          delete newFolder.selected;
          return newFolder;
        })
      );
      setIsFolder(false);
      setIsFolderLinks(false);
    } else {
      setShowCheckboxes(false);
      if (isFolderLinks) {
        setFolders((prevFolders) =>
          prevFolders.map((folder) => {
            const newFolder = { ...folder };
            newFolder.links = newFolder.links.map((link) => {
              const newLink = { ...link };
              delete newLink.selected;
              return newLink;
            });
            return newFolder;
          })
        );
        setIsFolder(false);
        setIsFolderLinks(false);
      } else {
        setLinks((prevLinks) =>
          prevLinks.map((link) => {
            const newLink = { ...link };
            delete newLink.selected;
            return newLink;
          })
        );
      }
    }
  };

  return (
    <Context.Provider
      value={{
        handleBulkCopyFolder,
        handleBulkDelete,
        showCheckboxes,
        setShowCheckboxes,
        handleSelect,
        handlePinClick,
        handleDelete,
        handleBulkCopy,
        handleCopyToClipboard,
        handleCopyFolder,
        copiedIndex,
        setCopiedIndex,
        isFolder,
        isFolderLinks,
        setIsFolder,
        setIsFolderLinks,
        handleCopyClick,
        handleBulkDeleteFolder,
        handleSelectAll,
        sortedNamedLinks,
        sortedUnnamedLinks,
        handleCancelSelect,
        handleSelectAllFolders,
        handleDeleteLinkInFolder,
        handleSelectAllLinksInFolder,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useLinkContext = () => useContext(Context);
