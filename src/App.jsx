import React, { useState, useRef } from "react";
import Header from "./components/Header";
import Inputs from "./components/Inputs";
import Body from "./components/Body";

const App = () => {
  const [inputs, setInputsValue] = useState({
    url_name: "",
    url: "",
  });
  const [showName, setShowName] = useState(false);
  const [links, setLinks] = useState(
    JSON.parse(localStorage.getItem("Links")) || []
  );
  const [whoClicked, setWhoClicked] = useState("");
  const refs = {
    inputRef: useRef(),
    tabRef: useRef(),
  };
  // const inputRef = useRef();
  // tabRef= useRef()
  // let whoClicked;

  const handleSaveInput = () => {
    if (refs.inputRef.current.value) {
      setShowName(true);
      refs.inputRef.current.value = "";
    }
    setWhoClicked("input");
  };

  const saveTab = () => {
    setShowName(true);
    setWhoClicked("tab");
  };

  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
  // async function handleTab() {
  //   const tab = await getCurrentTab();
  //   if (tab) {
  //     const tabUrl = tab.url;
  //     setLinks((prevLinks) => [
  //       ...prevLinks,
  //       { url_name: refs.tabRef.current.value, url: tabUrl },
  //     ]);
  //     const updatedLinks = [
  //       ...links,
  //       { url_name: refs.tabRef.current.value, url: tabUrl },
  //     ];
  //     localStorage.setItem("Links", JSON.stringify(updatedLinks));
  //     // refs.tabRef.current.value = "";
  //   } else {
  //     console.error("Error: Unable to retrieve current tab.");
  //   }
  // }
  // const handleTab = () => {
  //   const tab = window.location.href;
  //   setLinks((prevLinks) => [...prevLinks, { url: tab }]);
  //   const updatedLinks = [...links, { url: tab }];
  //   localStorage.setItem("Links", JSON.stringify(updatedLinks));
  // };
  const handleChange = (e) => {
    setInputsValue((prevLinks) => ({
      ...prevLinks,
      [e.target.name]: e.target.value,
    }));
  };

  const handleName = async (clicked) => {
    if (clicked === "tab") {
      try {
        const tab = await getCurrentTab();
        if (tab) {
          const tabUrl = tab.url;
          const urlName = refs.tabRef.current.value; 
          setLinks((prevLinks) => [...prevLinks, { url_name: urlName, url: tabUrl }]);
          const updatedLinks = [...links, { url_name: urlName, url: tabUrl }];
          localStorage.setItem("Links", JSON.stringify(updatedLinks));
          refs.tabRef.current.value = ""; 
        } else {
          console.error("Error: Unable to retrieve current tab.");
        }
      } catch (error) {
        console.error("Error while getting current tab:", error);
      }
      setShowName(false);
    }
    if (clicked === "input") {
      setShowName(false);
      setLinks((prevLinks) => [...prevLinks, inputs]);
      localStorage.setItem("Links", JSON.stringify([...links, inputs]));
      console.log(links);
    }
  };
  

  const handleClear = () => {
    setLinks([]);
    localStorage.clear();
  };

  const handleDelete = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);

    localStorage.setItem("Links", JSON.stringify(newLinks));
  };
  return (
    <div className=" ">
      <Header />
      <Inputs
        handleChange={handleChange}
        links={links}
        handleName={handleName}
        refs={refs}
        show={showName}
        setShowName={setShowName}
        handleSaveInput={handleSaveInput}
        handleClear={handleClear}
        saveTab={saveTab}
        whoClicked={whoClicked}
      />
      <Body links={links} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
