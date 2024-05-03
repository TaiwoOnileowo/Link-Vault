import React, { useRef } from "react";
import { styles } from "../../style";
const CustomNameInput = ({
  buttonClicked,
  setLinks,
  links,
  setShowCustomName,
  urlInput,
}) => {
  const customNameRef = useRef();

  const getCurrentTab = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  };

  const saveInput = (clickedCustomName) => {
    const urlName = customNameRef.current.value;
    const updatedLinks = [
      ...links,
      {
        url: urlInput,
        url_name: clickedCustomName === "save" ? urlName : "",
      },
    ];
    setLinks((prevLinks) => [
      ...prevLinks,
      {
        url: urlInput,
        url_name: clickedCustomName === "save" ? urlName : "",
      },
    ]);
    localStorage.setItem("Links", JSON.stringify(updatedLinks));
  };

  const saveTab = async () => {
    try {
      const tab = await getCurrentTab();
      if (tab) {
        const tabUrl = tab.url;
        const urlName = customNameRef.current.value;
        setLinks((prevLinks) => [
          ...prevLinks,
          { url_name: urlName, url: tabUrl },
        ]);
        const updatedLinks = [...links, { url_name: urlName, url: tabUrl }];
        localStorage.setItem("Links", JSON.stringify(updatedLinks));
        setShowCustomName(false);
        customNameRef.current.value = "";
      } else {
        console.error("Error: Unable to retrieve current tab.");
      }
    } catch (error) {
      console.error("Error while getting current tab:", error);
    }
  };

  const saveOrNeverMind = (clicked, clickedCustomName) => {
    if (clicked === "save-input") {
      saveInput(clickedCustomName);
      setShowCustomName(false);
    }
    if (clicked === "save-tab") {
      saveTab();
    }
  };

  return (
    <div className="flex flex-col pt-8">
      <label
        htmlFor="url"
        className="text-white text-[24px] font-semibold pb-4"
      >
        Wanna Give it a Name?
      </label>
      <input
        type="text"
        name="url_name"
        id="url_name"
        className={`${styles.input}`}
        ref={customNameRef}
      />

      <div className="flex gap-4">
        <button
          className={`${styles.button} button`}
          onClick={() => saveOrNeverMind(buttonClicked, "never-mind")}
        >
          NEVER MIND
        </button>
        <button
          className={`${styles.button} button`}
          onClick={() => saveOrNeverMind(buttonClicked, "save")}
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default CustomNameInput;
