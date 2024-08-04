import toast from "react-hot-toast";

const handleDeleteItems = (
  items: any[],
  setItems,
  index: number | null = null
) => {
  if (index !== null) {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);

    setItems(updatedItems);
  } else {
    setItems([]);
  }
};

const handleBulkDeleteItems = (
  items: any[],
  allItems: Array<any> | null,
  setItems,
  filterCriteria: (link: {
    url_name?: string;
    url?: string;
    selected?: boolean;
  }) => boolean,
  openModal: any,
  menu,
  shouldShowModal = false
) => {
  console.log("Items:", items);
  console.log(filterCriteria);
  const itemsToDelete = items.filter(filterCriteria);
  console.log("Items to delete:", itemsToDelete);
  console.log("Should show modal:", shouldShowModal);

  if (itemsToDelete.length > 0) {
    if (itemsToDelete.length === items.length && !shouldShowModal) {
      openModal(`Delete All Items`, null, null);
    } else {
      const itemsToKeep = items.filter((item) => !filterCriteria(item));
      let updatedItems: Array<any> = [];
      if (allItems) {
        updatedItems = [
          ...itemsToKeep,
          ...allItems.filter((item) =>
            menu === "Unnamed" ? item.url_name : !item.url_name
          ),
        ];
      } else {
        updatedItems = itemsToKeep;
      }

      setItems(updatedItems);
      toast.success("Deleted");
    }
  }
};

export { handleDeleteItems, handleBulkDeleteItems };
