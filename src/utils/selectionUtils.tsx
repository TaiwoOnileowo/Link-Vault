import { Links, Folders } from "../types";
/**
 * Toggles the `selected` state of an individual item (folder or link).
 * @param {Array} items - The array of items (folders or links).
 * @param {number} index - The index of the item to toggle.
 * @param {boolean} isFolder - Indicates if the item is a folder.
 * @param {number|null} openFolderIndex - The index of the folder if the item is a link in a folder.
 * @returns {Array} - The updated array of items with the toggled selection.
 */
export const toggleSelection = (
  items: Folders[] | Links[],
  index: number,
  isFolder: boolean = false,
  openFolderIndex: number | null = null
) => {
  const updatedItems = [...items];

  if (isFolder) {
    // Toggle selection for a folder
    const folder = { ...updatedItems[index] };
    folder.selected = !folder.selected;
    updatedItems[index] = folder;
    console.log(updatedItems[index], "Inside toggleSelection: folder");
    console.log("Inside toggleSelection:", folder.selected);
  } else if (openFolderIndex !== null) {
    // console.log("Inside toggleSelection: link", updatedItems[openFolderIndex].selected);
    // Toggle selection for a link inside a folder
    const folder: Folders = { ...updatedItems[openFolderIndex] };
    const updatedLinks: Links[] = [...folder.links];
    const link = { ...updatedLinks[index] };
    console.log("Inside toggleSelection: link", link, updatedLinks);
    link.selected = !link.selected;
    console.log("Inside toggleSelection: link3", link);
    updatedLinks[index] = link;
    folder.links = updatedLinks;
    updatedItems[openFolderIndex] = folder;
  } else {
    // Toggle selection for a global link
    console.log("Inside toggleSelection: link", updatedItems[index].selected);
    const link = { ...updatedItems[index] };
    link.selected = !link.selected;
    updatedItems[index] = link;
  }

  return updatedItems;
};

/**
 * Selects or deselects all items in a given category (folders or links) or based on a filter (unnamed/named).
 * @param {Array} items - The array of items (folders or links).
 * @param {string} [menu=null] - The category to apply selection ("Unnamed", "Named", or null for all).
 * @param {boolean} [isFolder=false] - Indicates if the items are folders.
 * @param {boolean} [isFolderLinks=false] - Indicates if the items are links within a folder.
 * @param {number|null} [openFolderIndex=null] - The index of the folder if the items are links within a folder.
 * @returns {Array} - The updated array of items with the toggled selection.
 */
export const toggleBulkSelection = (
  items: Folders[] | Links[],
  isSelectClick = false,
  menu: string | null = null,
  isFolder: boolean = false,
  isFolderLinks: boolean = false,
  openFolderIndex: number | null = null
) => {
  const updatedItems = [...items];
  console.log(openFolderIndex, isFolderLinks);
  if (isFolderLinks && openFolderIndex !== null) {
    // Toggle selection for all links inside a specific folder
    const folder: Folder = { ...updatedItems[openFolderIndex] };
    const allSelected = isSelectClick
      ? true
      : folder.links.every((link: { selected: boolean }) => link.selected);
    folder.links = folder.links.map((link: { selected: boolean }) => ({
      ...link,
      selected: !allSelected,
    }));

    updatedItems[openFolderIndex] = folder;
  } else {
    // Toggle selection for folders or global links
    const allSelected = isSelectClick
      ? true
      : items.every((item) => item.selected);

    console.log("dax", items, isSelectClick, allSelected, isFolder, menu);
    updatedItems.forEach((item, index) => {
      if (isFolder) {
        updatedItems[index] = { ...item, selected: !allSelected };
      } else if (menu) {
        if (
          (menu === "Unnamed" && !item.url_name) ||
          (menu === "Named" && item.url_name)
        ) {
          updatedItems[index] = { ...item, selected: !allSelected };
        }
      } else {
        updatedItems[index] = { ...item, selected: !allSelected };
      }
    });
  }

  return updatedItems;
};
