import { useEffect } from "react";
import { getAdjustedPosition } from "../utils/contextMenuUtils";

const useContextMenuPosition = (
  x: number,
  y: number,
  visible: boolean,
  menuRef:React.RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    if (menuRef.current && visible) {
      const { adjustedX, adjustedY } = getAdjustedPosition(x, y, menuRef);
      menuRef.current.style.left = `${adjustedX}px`;
      menuRef.current.style.top = `${adjustedY}px`;
    }
  }, [x, y, visible, menuRef]);
};

export default useContextMenuPosition;
