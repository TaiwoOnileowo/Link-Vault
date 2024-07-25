import toast from "react-hot-toast";

const handleDeleteItems = (
  items,
  setItems,
  itemType,
  index = null,
  setToLocalStorage,
  localStorageKey
) => {
  if (index !== null) {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setToLocalStorage(localStorageKey, updatedItems);
    setItems(updatedItems);
  } else {
    setToLocalStorage(localStorageKey, []);
    setItems([]);
  }
};

const handleBulkDeleteItems = (
  items,
  allItems = null,
  setItems,
  setToLocalStorage,
  localStorageKey,
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
      setToLocalStorage(localStorageKey, updatedItems);
      setItems(updatedItems);
      toast.success("Deleted");
    }
  }
};

export { handleDeleteItems, handleBulkDeleteItems };
