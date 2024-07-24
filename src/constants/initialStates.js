export const initialLinks = () => JSON.parse(localStorage.getItem("Links")) || [];
export const initialFolders = JSON.parse(localStorage.getItem("Folders")) || [];
export const initialDarkMode = JSON.parse(localStorage.getItem("darkMode"));

export const initialInputs = {
  url: "",
  url_name: "",
  tags: "",
};

export const initialFolderInputs = {
  folder_name: "",
  links: [],
};

export const initialRoutes = {
  home: true,
  search: false,
  folders: false,
};

export const initialContextMenu = {
  visible: false,
  x: 0,
  y: 0,
  linkIndex: null,
};
