import { useState, useRef, useEffect } from "react";
import { initialContextMenu } from "../constants/initialStates";

const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  const contextMenuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        setContextMenu(initialContextMenu);
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
    setContextMenu(initialContextMenu);
  };

  return {
    contextMenu,
    contextMenuRef,
    handleContextMenu,
    handleHideContextMenu,
  };
};

export default useContextMenu;
