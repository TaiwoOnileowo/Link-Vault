import { useState, useRef, useEffect } from "react";
import { initialContextMenu } from "../constants/initialStates";

const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  const contextMenuRef = useRef<any>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
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

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
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
