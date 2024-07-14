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

const Context = createContext();

export const LinkContext = ({ children }) => {
  const { links, setLinks, openModal } = useAppContext();

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    linkIndex: null,
  });
  const [copiedLink, setCopiedLink] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const contextMenuRef = useRef();
  const linksPerPage = 15;
  const indexOfLastLink = currentPage * linksPerPage;

  function getPaginatedLinks(data) {
    const currentLinks = data.slice(0, indexOfLastLink);
    return currentLinks;
  }

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        setContextMenu({ visible: false, x: 0, y: 0, linkIndex: null });
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleContextMenu = (e, index) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      linkIndex: index,
    });
  };

  const handleHideContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleCopyClick = (url, index) => {
    setCopiedLink(index);
    handleCopyToClipboard(url);
    setTimeout(() => {
      setCopiedLink(null);
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
  const handleBulkCopy = useCallback(() => {
    const selectedLinks = links.filter((link) => link.selected);
    const selectedUrls = selectedLinks.map((link) => link.url).join("\n");
    if (selectedLinks.length > 0) {
      handleCopyToClipboard(selectedUrls);
      setShowCheckboxes(false);
      setLinks((prevLinks) =>
        prevLinks.map((link) => ({ ...link, selected: false }))
      );
    }
  }, [links, handleCopyToClipboard]);
  const handleDelete = useCallback(
    (index) => {
      setLinks((prevLinks) => {
        const newLinks = [...prevLinks];
        newLinks.splice(index, 1);
        localStorage.setItem("Links", JSON.stringify(newLinks));
        return newLinks;
      });
      toast.success("Deleted");
    },
    [setLinks]
  );
  const handlePinClick = useCallback(
    (index) => {
      setLinks((prevLinks) => {
        const updatedLinks = [...prevLinks];
        const link = updatedLinks[index];

        // Check if link has been pinned before
        if (link.originalIndex === undefined) {
          // First time pinning: store originalIndex
          link.originalIndex = index;
        }

        link.pinned = !link.pinned;
        if (link.pinned) {
          // Move the pinned link to the top
          updatedLinks.splice(index, 1);
          updatedLinks.unshift(link);
        } else {
          // Unpin: move the link back to its original position
          const originalIndex = link.originalIndex;
          updatedLinks.splice(index, 1);
          updatedLinks.splice(originalIndex, 0, link);
        }

        localStorage.setItem("Links", JSON.stringify(updatedLinks));
        toast.success(link.pinned ? "Pinned" : "Unpinned");
        return updatedLinks;
      });
    },
    [setLinks]
  );
  const handleSelect = (index) => {
    setLinks((prevLinks) =>
      prevLinks.map((link, i) =>
        i === index ? { ...link, selected: !link.selected } : link
      )
    );
  };

  const handleBulkDelete = useCallback(
    (menu) => {
      const linksInMenu = links.filter((link) =>
        menu === "unnamed" ? !link.url_name : link.url_name
      );
      const linksSelectedInMenu = linksInMenu.filter((link) => link.selected);

      if (linksSelectedInMenu.length > 0) {
        if (linksSelectedInMenu.length === linksInMenu.length) {
          openModal(`Delete All ${menu} Links`, null);
        } else {
          const linksToKeep = links.filter((link) => {
            if (menu === "unnamed" && !link.url_name) {
              return !link.selected;
            } else if (menu === "named" && link.url_name) {
              return !link.selected;
            }
            return true;
          });

          setLinks(linksToKeep);
          localStorage.setItem("Links", JSON.stringify(linksToKeep));
          setShowCheckboxes(false);
          setLinks((prevLinks) =>
            prevLinks.map((link) => ({ ...link, selected: false }))
          );
          toast.success("Deleted");
        }
      }
    },
    [links, setLinks, openModal, setShowCheckboxes]
  );

  const handleSelectAll = (menu) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => {
        if (menu === "unnamed" && !link.url_name) {
          return {
            ...link,
            selected: !links
              .filter((link) => !link.url_name)
              .every((link) => link.selected),
          };
        } else if (menu === "named" && link.url_name) {
          return {
            ...link,
            selected: !links
              .filter((link) => link.url_name)
              .every((link) => link.selected),
          };
        }
        return link;
      })
    );
  };

  return (
    <Context.Provider
      value={{
        handleBulkDelete,
        showCheckboxes,
        setShowCheckboxes,
        handleSelect,
        handlePinClick,
        handleDelete,
        handleBulkCopy,
        handleCopyToClipboard,
        selectedMenu,
        setSelectedMenu,
        contextMenu,
        setContextMenu,
        copiedLink,
        setCopiedLink,
        contextMenuRef,
        handleContextMenu,
        handleHideContextMenu,
        handleCopyClick,
        getPaginatedLinks,
        loadMore,
        indexOfLastLink,
        handleSelectAll,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useLinkContext = () => useContext(Context);
