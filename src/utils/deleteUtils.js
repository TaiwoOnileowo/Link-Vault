import toast from "react-hot-toast";

export const handleDeleteItems = (
  items,
  setItems,
  itemType,
  index = null,
  setToLocalStorage,
  localStorageKey
) => {
  // Remove item(s) based on index or all items if no index is provided
  if (index !== null) {
    // Delete a single item
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setToLocalStorage(localStorageKey, updatedItems);
    setItems(updatedItems);
  } else {
    // Delete all items
    setToLocalStorage(localStorageKey, []);
    setItems([]);
  }
};

export const handleBulkDeleteItems = (
  items,
  allItems = null,
  setItems,
  setToLocalStorage,
  localStorageKey,
  filterCriteria,
  showModal,
  whatToRetainFilterCriteria = null
) => {
  const itemsToDelete = items.filter(filterCriteria);
  console.log(itemsToDelete);
  console.log(items);
  if (itemsToDelete.length > 0) {
    if (itemsToDelete.length === items.length) {
      showModal(`Delete All Items`, null, null);
    } else {
      const itemsToKeep = items.filter((item) => !filterCriteria(item));
      let updatedItems = [];
      if (allItems) {
        updatedItems = [
          ...itemsToKeep,

          allItems.filter((item) => whatToRetainFilterCriteria(item)),
        ];
      } else {
        updatedItems = itemsToKeep;
      }
      setToLocalStorage(localStorageKey, updatedItems);
      setItems(updatedItems);
      toast.success("Deleted");
    }
  }
};
