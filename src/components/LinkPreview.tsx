import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../context";
import { useLinkContext } from "../context";
import PropTypes from "prop-types";
import icon from "/icon.png";
import {
  getFormattedDescription,
  getFormattedTitle,
} from "../utils/stringFormatters";

async function fetchLinkMetadata(url) {
  try {
    const proxyUrl = `https://link-vault-proxy-1.onrender.com/fetch-metadata?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const metadata = await response.json();
    return metadata;
  } catch (error) {
    console.error("Error fetching the link metadata:", error);
    throw error;
  }
}

const LinkPreview = ({ url }) => {
  const [metadata, setMetadata] = useState(null);
  const { previewLink, contextMenu } = useAppContext();
  const { showCheckboxes } = useLinkContext();
  const previewRef = useRef();
  const { x, y, visible } = previewLink;

  useEffect(() => {
    async function getMetadata() {
      if (contextMenu.visible || showCheckboxes) {
        return;
      } else {
        try {
          const meta = await fetchLinkMetadata(url);
          setMetadata(meta);
        } catch (err) {
          console.error(err);
        }
      }
    }

    getMetadata();
  }, [url, contextMenu.visible, showCheckboxes]);

  if (contextMenu.visible || showCheckboxes) {
    return null;
  }

  return (
    <>
      {metadata && (
        <div
          className="link-preview absolute z-50 p-2 bg-inputBg dark:bg-gray-500 text-black dark:text-white rounded shadow-lg w-[200px]"
          ref={previewRef}
          style={{
            top: `${y}px`,
            left: `${x}px`,
            display: visible ? "block" : "none",
          }}
        >
          <h3 className="text-sm font-semibold">
            {getFormattedTitle(metadata.ogTitle)}
          </h3>
          <p className="text-xs">
            {getFormattedDescription(metadata.ogDescription)}
          </p>
          {metadata.ogImage && metadata.ogImage.length > 0 && (
            <img
              src={metadata.ogImage[0].url}
              alt="Preview"
              className="w-full h-[150px] mt-2 rounded"
            />
          )}
          <div className="flex gap-2 items-center mt-4">
            <img src={icon} alt="Link Vault" className="w-4 h-4" />
            <h1 className="text-xs font-bold">Link Vault</h1>
          </div>
        </div>
      )}
    </>
  );
};

LinkPreview.propTypes = {
  url: PropTypes.string.isRequired,
};

export default LinkPreview;