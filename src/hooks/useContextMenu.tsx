import {  useRef, useEffect } from "react";
import { initialContextMenu } from "../constants/initialStates";
import { useModalContext } from "../context";
import { ModalContextType } from "../types";

const useContextMenu = () => {
  const contextMenuRef = useRef<any>();
const { contextMenu, setContextMenu } = useModalContext() as ModalContextType;
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
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    console.log(e.pageX, e.pageY);
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
