import toast from "react-hot-toast";
import { Folders, Links } from "../types";
const handleDeleteItems = (
  items: (Folders | Links)[],
  setItems: React.Dispatch<React.SetStateAction<(Folders | Links)[] | null>>,
  index: number | null = null
) => {
  if (index !== null) {
    const updatedItems: (Folders | Links)[] = [...items];
    updatedItems.splice(index, 1);

    setItems(updatedItems);
  } else {
    setItems([]);
  }
};

const handleBulkDeleteItems = (
  items: Folders[] | Links[],
  allItems:Links[] | null,
  setItems: React.Dispatch<React.SetStateAction<(Folders[] | Links[]) | null>>,
  filterCriteria: (link: Folders | Links) => boolean,
  openModal: any,
  menu: string |  null,
  shouldShowModal = false
) => {
  console.log("Items:", items);
  console.log(filterCriteria);
  const itemsToDelete: Folders[] | Links[] = items.filter(filterCriteria);
  console.log("Items to delete:", itemsToDelete);
  console.log("Should show modal:", shouldShowModal);

  if (itemsToDelete.length > 0) {
    if (itemsToDelete.length === items.length && !shouldShowModal) {
      openModal(`Delete All Items`, null, null);
    } else {
      const itemsToKeep = items.filter(
        (item: Folders | Links) => !filterCriteria(item)
      );
      let updatedItems: Folders[] | Links[] = [];
      if (allItems) {
        updatedItems = [
          ...itemsToKeep,
          ...allItems.filter((item: Links) =>
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
