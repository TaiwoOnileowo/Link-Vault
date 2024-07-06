import React, { useRef } from "react";
import { styles } from "../../style";
import toast from "react-hot-toast";
import { useInputsContext } from "../../Context/InputsContext";

import { useAppContext } from "../../Context/AppContext";
const CustomNameInput = () => {
  const { setLinks, links, setMenu } = useAppContext();
  const { setShowCustomName, buttonClicked, urlInput, setShowAdd } =
    useInputsContext();
  const customNameRef = useRef();
  const sortedLinks = links.sort((a, b) => b.pinned - a.pinned);
  const getCurrentTab = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  };

  const saveInput = (clickedCustomName) => {
    const urlName = customNameRef.current.value;
    if (urlName && clickedCustomName === "save") {
      const updatedLinks = [
        {
          url: urlInput,
          url_name: urlName,
          pinned: false,
        },
        ...sortedLinks,
      ];
      setLinks((prevLinks) => [
        {
          url: urlInput,
          url_name: urlName,
          pinned: false,
        },
        ...prevLinks,
      ]);
      setMenu("named");
      localStorage.setItem("Links", JSON.stringify(updatedLinks));
      setShowAdd(false);
      setShowCustomName(false);
      toast.success("Saved successfully!");
    } else if (clickedCustomName === "never-mind") {
      const updatedLinks = [
        {
          url: urlInput,
          url_name: "",
          pinned: false,
        },
        ...sortedLinks,
      ];
      setLinks((prevLinks) => [
        {
          url: urlInput,
          url_name: "",
          pinned: false,
        },
        ...prevLinks,
      ]);
      setMenu("unnamed");
      localStorage.setItem("Links", JSON.stringify(updatedLinks));
      setShowAdd(false);
      setShowCustomName(false);
      toast.success("Saved successfully!");
    }
  };

  const saveTab = async (clickedCustomName) => {
    const urlName = customNameRef.current.value;
    const tab = await getCurrentTab();

    if (urlName && clickedCustomName === "save") {
      try {
        if (tab) {
          const tabUrl = tab.url;
          setLinks((prevLinks) => [
            { url_name: urlName, url: tabUrl, pinned: false },
            ...prevLinks,
          ]);
          const updatedLinks = [
            { url_name: urlName, url: tabUrl, pinned: false },
            ...sortedLinks,
          ];
          localStorage.setItem("Links", JSON.stringify(updatedLinks));
          customNameRef.current.value = "";
          setShowCustomName(false);
          setShowAdd(false);
          setMenu("named");
          toast.success("Saved successfully!");
        } else {
          console.error("Error: Unable to retrieve current tab.");
        }
      } catch (error) {
        console.error("Error while getting current tab:", error);
      }
    } else if (clickedCustomName === "never-mind") {
      try {
        if (tab) {
          const tabUrl = tab.url;
          setLinks((prevLinks) => [
            { url_name: urlName, url: tabUrl, pinned: false },
            ...prevLinks,
          ]);
          const updatedLinks = [
            { url_name: urlName, url: tabUrl, pinned: false },
            ...sortedLinks,
          ];
          localStorage.setItem("Links", JSON.stringify(updatedLinks));
          customNameRef.current.value = "";
          setShowCustomName(false);
          setShowAdd(false);
          setMenu("unnamed");
          toast.success("Saved successfully!");
        } else {
          console.error("Error: Unable to retrieve current tab.");
        }
      } catch (error) {
        console.error("Error while getting current tab:", error);
      }
    }
  };

  const saveOrNeverMind = (clicked, clickedCustomName) => {
    if (clicked === "save-input") {
      saveInput(clickedCustomName);
    }
    if (clicked === "save-tab") {
      saveTab(clickedCustomName);
    }
  };

  return (
    <div className="flex flex-col swipe-right">
      <label htmlFor="url" className="text-white  text-xl font-bold pb-4">
        Give it a short name
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
          className={`${styles.button1} button`}
          onClick={() => saveOrNeverMind(buttonClicked, "never-mind")}
        >
          NEVER MIND
        </button>
        <button
          className={`${styles.button1} button`}
          onClick={() => saveOrNeverMind(buttonClicked, "save")}
        >
          DONE
        </button>
      </div>
    </div>
  );
};

export default CustomNameInput;
