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
  const { links, setLinks, setMenu } = useAppContext();

  const [inputIndex, setInputIndex] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    linkIndex: null,
  });
  const [copiedLink, setCopiedLink] = useState(null);

  const contextMenuRef = useRef();

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

  const handleEditClick = (index, currentValue = "") => {
    handleHideContextMenu();
    setInputIndex(`${index}-edit`);
    setEditedValue(currentValue);
  };
  console.log(editedValue);
  const handleCopyClick = (url, index) => {
    setCopiedLink(index);
    handleCopyToClipboard(url);
    setTimeout(() => {
      setCopiedLink(null);
    }, 3000);
  };

  const handleEditInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  const handleSubmit = useCallback(
    (index, value, isEdit = false) => {
      const updatedLinks = links.map((link, i) =>
        i === index
          ? { ...link, ...(isEdit ? { url: value } : { url_name: value }) }
          : link
      );
      if (value) {
        setLinks(updatedLinks);
        localStorage.setItem("Links", JSON.stringify(updatedLinks));
        setInputIndex(null);
        if (!isEdit) setMenu("named");
        toast.success("Edited");
      }
    },
    [links, setLinks, setMenu]
  );

  const handleCopyToClipboard = useCallback(async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  }, []);

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

  return (
    <Context.Provider
      value={{
        handlePinClick,
        handleDelete,
        handleCopyToClipboard,
        handleSubmit,
        inputIndex,
        setInputIndex,
        setEditedValue,
        editedValue,
        contextMenu,
        setContextMenu,
        copiedLink,
        setCopiedLink,
        contextMenuRef,
        handleContextMenu,
        handleHideContextMenu,
        handleEditInputChange,
        handleEditClick,
        handleCopyClick,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useLinkContext = () => useContext(Context);
