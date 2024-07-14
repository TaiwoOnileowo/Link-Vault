import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";

const Context = createContext();

export const AppContext = ({ children }) => {
  ////////////////////////////         STATE ////////////////////////////
  const [links, setLinks] = useState(() => {
    return JSON.parse(localStorage.getItem("Links")) || [];
  });
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("mode"))
  );
  const [searchInput, setSearchInput] = useState("");
  const [menu, setMenu] = useState("unnamed");
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [linkDetails, setLinkDetails] = useState({});
  const [inputs, setInputs] = useState({
    url: "",
    url_name: "",
    tags: "",
    pinned: false,
    selected: false,
  });
  const [routes, setRoutes] = useState({
    home: true,
    search: false,
    folders: false,
  });
  const modalRef = useRef();
  ///////////////////// FUNCTIONS ////////////////////////////////////////////
  const handleClose = () => {
    setIsOpen(false);
    setInputs({
      url: "",
      url_name: "",
      tags: "",
      pinned: false,
      selected: false,
    });
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
      }));
    }
  }, [searchInput]);

  const openModal = (modalText, linkDetails) => {
    modalRef.current.open();
    setModalText(modalText);
    setInputs({
      url: "",
      url_name: "",
      tags: "",
      pinned: false,
      selected: false,
    });
    if (linkDetails) {
      setInputs(linkDetails);
      setLinkDetails(linkDetails);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <Context.Provider
      value={{
        routes,
        setRoutes,
        inputs,
        setInputs,
        modalText,
        modalRef,
        links,
        setLinks,
        menu,
        setMenu,
        handleClose,
        linkDetails,
        openModal,
        isOpen,
        setIsOpen,
        handleSearchInputChange,
        searchInput,
        darkMode,
        setDarkMode,
        handleSetRoutes,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
