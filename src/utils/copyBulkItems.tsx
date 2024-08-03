import { copyToClipboard } from "./clipboardUtils"; // Import your clipboard copy function

export const handleBulkCopyItems = (
  items: any[],
  setItems,
  itemType: string,
  itemIndex = null,
  isFolderLinks = false
) => {
  // Filter selected items
  const selectedItems = isFolderLinks
    ? items[itemIndex].links.filter((link) => link.selected)
    : items.filter((item) => item.selected);

  // Create a string of URLs to copy
  let urlsToCopy = [];
  if (isFolderLinks) {
    urlsToCopy = selectedItems.map((link) => link.url).join("\n");
  } else if (itemType === "folder") {
    urlsToCopy = selectedItems
      .flatMap((item) => item.links.map((link) => link.url))
      .join("\n");
  } else {
    urlsToCopy = selectedItems.map((item) => item.url).join("\n");
  }

  if (urlsToCopy.length > 0) {
    // Copy URLs to clipboard
    copyToClipboard(urlsToCopy);

    // Deselect items
    setItems((prevItems) =>
      prevItems.map((item, i) => {
        if (isFolderLinks && i === itemIndex) {
          return {
            ...item,
            links: item.links.map((link) => ({ ...link, selected: false })),
          };
        } else if (itemType === "folder") {
          return { ...item, selected: false };
        } else {
          return { ...item, selected: false };
        }
      })
    );
  }
};
