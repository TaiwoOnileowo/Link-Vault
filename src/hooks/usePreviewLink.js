import { useState, useRef } from "react";
import { initialPreviewLink } from "../constants/initialStates";

const usePreviewLink = () => {
  const [previewLink, setPreviewLink] = useState(initialPreviewLink);
  const previewLinkRef = useRef();

  const handleHover = (e, index) => {
    e.preventDefault();
    const offset = 20;
    const previewWidth = 200; // Adjust as per your preview's actual width
    const previewHeight = 280; // Adjust as per your preview's actual height

    let x = e.clientX + offset;
    let y = e.clientY + offset;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (x + previewWidth > windowWidth) {
      x = e.clientX - previewWidth - offset;
    }
    if (y + previewHeight > windowHeight) {
      y = e.clientY - previewHeight - offset;
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
