import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";
// import { useFolderContext } from "./FolderContext"y;
const Context = createContext();

export const AppContext = ({ children }) => {
  ////////////////////////////         STATE ////////////////////////////
  const [links, setLinks] = useState(() => {
    return JSON.parse(localStorage.getItem("Links")) || [];
  });
  const [folders, setFolders] = useState(
    JSON.parse(localStorage.getItem("Folders")) || []
  );
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("mode"))
  );
  const [active, setActive] = useState("Home");
  const [searchInput, setSearchInput] = useState("");
  const [menu, setMenu] = useState("Unnamed");
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [inputs, setInputs] = useState({
    url: "",
    url_name: "",
    tags: "",
  
  });
  const [folderInputs, setFolderInputs] = useState({
    folder_name: "",
    links: [],
     
  });
  const [routes, setRoutes] = useState({
    home: true,
    search: false,
    folders: false,
  });
  const [toggle, setToggle] = useState(false);
  const modalRef = useRef();
  const contextMenuRef = useRef();
  const navRef = useRef();
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    linkIndex: null,
  });

  ///////////////////// FUNCTIONS ////////////////////////////////////////////

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        setContextMenu({ visible: false, x: 0, y: 0, linkIndex: null });
      }
      if (navRef.current && !navRef.current.contains(event.target)) {
        setToggle(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleContextMenu = (e, index, isFolderContext) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      linkIndex: index,
    });
  };

  const handleHideContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleClose = () => {
    setIsOpen(false);
    setInputs({
      url: "",
      url_name: "",
      tags: "",

      folder_name: "",
    });
    setModalText("");
  };

  const handleSetRoutes = (value) => {
    const updatedRoutes = Object.keys(routes).reduce((acc, key) => {
      acc[key] = key === value; // Set current key to true if it matches the value, false otherwise
      return acc;
    }, {});

    setRoutes(updatedRoutes);
  };

  useEffect(() => {
    if (searchInput) {
      handleSetRoutes("search");
    } else {
      setRoutes((prevRoutes) => ({
        ...prevRoutes,
        search: false,
        home: true,
      }));
      setActive("Home");
    }
  }, [searchInput]);

  const openModal = (
    modalText,
    linkDetails,
    linkIndex,
    isFolder,
    
  ) => {
    modalRef.current.open();
    setModalText(modalText);
    setInputs({
      url: "",
      url_name: "",
      tags: "",

      folder_name: "",
    });
    setFolderInputs({
      folder_name: "",
      links: [],
    });

    if (linkDetails) {
      if (isFolder) {
        setFolderInputs(linkDetails);
        setEditIndex(linkIndex);
        setMenu("Name");
      } else {
        setInputs(linkDetails);
        setEditIndex(linkIndex);
        console.log(linkIndex);
      }
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <Context.Provider
      value={{
        contextMenu,
        setContextMenu,
        contextMenuRef,
        handleContextMenu,
        handleHideContextMenu,
        routes,
        setRoutes,
        folderInputs,
        setFolderInputs,
        inputs,
        setInputs,
        modalText,
        modalRef,
        links,
        setLinks,
        menu,
        setMenu,
        handleClose,
        editIndex,
        openModal,
        isOpen,
        setIsOpen,
        handleSearchInputChange,
        searchInput,
        darkMode,
        setDarkMode,
        handleSetRoutes,
        setToggle,
        toggle,
        folders,
        setFolders,
        navRef,
        active,
        setActive,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
