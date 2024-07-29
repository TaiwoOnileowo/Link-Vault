import { folderIcons } from "../../public/foldericons";
export const initialDarkMode = JSON.parse(localStorage.getItem("darkMode"));

export const initialInputs = {
  url: "",
  url_name: "",
  tags: "",
};

export const initialFolderInputs = {
  folder_name: "",
  links: [],
  folder_icon: folderIcons[8],
};

export const initialContextMenu = {
  visible: false,
  x: 0,
  y: 0,
  linkIndex: null,
};
export const initialPreviewLink = {
  visible: false,
  x: 0,
  y: 0,
  linkIndex: null,
};
