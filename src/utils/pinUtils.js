export const togglePin = (items, index, itemType) => {
  let updatedItems = [...items];
  const item = { ...updatedItems[index] };

  // Toggle the pin state
  item.pinned = !item.pinned;

  if (item.pinned) {
    item.originalIndex = item.originalIndex || index;
    // Move the item to the top if pinned
    updatedItems.splice(index, 1);
    updatedItems.unshift(item);
  } else {
    // Restore the item to its original position if unpinned
    const originalIndex = item.originalIndex;
    updatedItems.splice(index, 1);
    updatedItems.splice(originalIndex, 0, item);
    delete item.originalIndex;
  }

  return updatedItems;
};
