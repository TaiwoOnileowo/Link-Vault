import toast from "react-hot-toast";

const handleDeleteItems = (
  items,
  setItems,
  itemType,
  index = null,
  updateStorage,
  storageKey
) => {
  if (index !== null) {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    updateStorage(storageKey, updatedItems);
    setItems(updatedItems);
  } else {
    updateStorage(storageKey, []);
    setItems([]);
  }
};

const handleBulkDeleteItems = (
  items,
  allItems = null,
  setItems,
  updateStorage,
  storageKey,
  filterCriteria,
  showModal,
  whatToRetainFilterCriteria = null,
  shouldShowModal = false
) => {
  console.log("Items:", items);
  console.log(filterCriteria);
  const itemsToDelete = items.filter(filterCriteria);
  console.log("Items to delete:", itemsToDelete);
  console.log("Should show modal:", shouldShowModal);

  if (itemsToDelete.length > 0) {
    if (itemsToDelete.length === items.length && !shouldShowModal) {
      showModal(`Delete All Items`, null, null);
    } else {
      const itemsToKeep = items.filter((item) => !filterCriteria(item));
      let updatedItems = [];
      if (allItems) {
        updatedItems = [
          ...itemsToKeep,
          ...allItems.filter((item) => whatToRetainFilterCriteria(item)),
        ];
      } else {
        updatedItems = itemsToKeep;
      }
      updateStorage(storageKey, updatedItems);
      setItems(updatedItems);
      toast.success("Deleted");
    }
  }
};

export { handleDeleteItems, handleBulkDeleteItems };
