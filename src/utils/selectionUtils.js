/**
 * Toggles the `selected` state of an individual item (folder or link).
 * @param {Array} items - The array of items (folders or links).
 * @param {number} index - The index of the item to toggle.
 * @param {boolean} isFolder - Indicates if the item is a folder.
 * @param {number|null} folderIndex - The index of the folder if the item is a link in a folder.
 * @returns {Array} - The updated array of items with the toggled selection.
 */
export const toggleSelection = (
  items,
  index,
  isFolder = false,
  folderIndex = null
) => {
  const updatedItems = [...items];

  if (isFolder) {
    // Toggle selection for a folder
    const folder = { ...updatedItems[index] };
    folder.selected = !folder.selected;
    updatedItems[index] = folder;
  } else if (folderIndex !== null) {
    // Toggle selection for a link inside a folder
    const folder = { ...updatedItems[folderIndex] };
    const updatedLinks = [...folder.links];
    const link = { ...updatedLinks[index] };
    link.selected = !link.selected;
    updatedLinks[index] = link;
    folder.links = updatedLinks;
    updatedItems[folderIndex] = folder;
  } else {
    // Toggle selection for a global link
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
 * @param {number|null} [folderIndex=null] - The index of the folder if the items are links within a folder.
 * @returns {Array} - The updated array of items with the toggled selection.
 */
export const toggleBulkSelection = (
  items,
  menu = null,
  isFolder = false,
  isFolderLinks = false,
  folderIndex = null
) => {
  const updatedItems = [...items];

  if (isFolderLinks && folderIndex !== null) {
    // Toggle selection for all links inside a specific folder
    const folder = { ...updatedItems[folderIndex] };
    const allSelected = folder.links.every((link) => link.selected);
    folder.links = folder.links.map((link) => ({
      ...link,
      selected: !allSelected,
    }));
    updatedItems[folderIndex] = folder;
  } else {
    // Toggle selection for folders or global links
    const allSelected = items.every((item) => item.selected);
    updatedItems.forEach((item, index) => {
      if (isFolder) {
        updatedItems[index] = { ...item, selected: !allSelected };
      } else if (menu) {
        if ((menu === "Unnamed" && !item.url_name) || (menu === "Named" && item.url_name)) {
          updatedItems[index] = { ...item, selected: !allSelected };
        }
      } else {
        updatedItems[index] = { ...item, selected: !allSelected };
      }
    });
  }

  return updatedItems;
};
