import { useState, useRef } from "react";
import { initialPreviewLink } from "../constants/initialStates";
import { ContextMenuType } from "../types";

const usePreviewLink = () => {
  const [previewLink, setPreviewLink] =
    useState<ContextMenuType>(initialPreviewLink);
  const previewLinkRef = useRef<HTMLDivElement |null>(null);

  const handleHover = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    const offset = 20;
    const previewWidth = 200;
    const previewHeight = 280;

    let x = e.clientX + offset;
    let y = e.clientY + offset;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (x + previewWidth > windowWidth) {
      x = windowWidth - previewWidth - offset;
    }
    if (x < 0) {
      x = offset;
    }
    if (y + previewHeight > windowHeight) {
      y = windowHeight - previewHeight - offset;
    }
    if (y < 0) {
      y = offset;
    }

    setPreviewLink({
      visible: true,
      x,
      y,
      linkIndex: index,
    });
  };

  const handleHidePreviewLink = () => {
    setPreviewLink(initialPreviewLink);
  };

  return {
    previewLink,
    previewLinkRef,
    handleHover,
    handleHidePreviewLink,
  };
};

export default usePreviewLink;
