import React, { useRef } from "react";
import { styles } from "../../style";
import toast from "react-hot-toast";

const CustomNameInput = ({
  buttonClicked,
  setLinks,
  links,
  setShowCustomName,
  urlInput,
  setShowAdd,
  setMenu,
}) => {
  const customNameRef = useRef();

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
        },
        ...links,
      ];
      setLinks((prevLinks) => [
        {
          url: urlInput,
          url_name: urlName,
        },
        ...prevLinks,
      ]);
      setMenu("named");
      localStorage.setItem("Links", JSON.stringify(updatedLinks));
      setShowAdd(false);
      toast.success("Saved successfully!");
    } else if (clickedCustomName === "never-mind") {
      const updatedLinks = [
        {
          url: urlInput,
          url_name: "",
        },
        ...links,
      ];
      setLinks((prevLinks) => [
        {
          url: urlInput,
          url_name: "",
        },
        ...prevLinks,
      ]);
      setMenu("unnamed");
      localStorage.setItem("Links", JSON.stringify(updatedLinks));
      setShowAdd(false);
      toast.success("Saved successfully!");
    }
  };

  const saveTab = async (clickedCustomName) => {
    const urlName = customNameRef.current.value;
    const tab = await getCurrentTab();
  
    if (urlName && clickedCustomName === "save" ) {
      try {
        if (tab) {
          const tabUrl = tab.url;
          setLinks((prevLinks) => [
            { url_name: urlName, url: tabUrl },
            ...prevLinks,
          ]);
          const updatedLinks = [{ url_name: urlName, url: tabUrl }, ...links];
          localStorage.setItem("Links", JSON.stringify(updatedLinks));
          setShowCustomName(false);
          customNameRef.current.value = "";
          setShowAdd(false);
          setMenu("named");
          toast.success("Saved successfully!");
        } else {
          console.error("Error: Unable to retrieve current tab.");
        }
      } catch (error) {
        console.error("Error while getting current tab:", error);
      }
    } else if (clickedCustomName === "never-mind" ) {
      try {
        if (tab) {
          const tabUrl = tab.url;
          setLinks((prevLinks) => [
            { url_name: urlName, url: tabUrl },
            ...prevLinks,
          ]);
          const updatedLinks = [{ url_name: urlName, url: tabUrl }, ...links];
          localStorage.setItem("Links", JSON.stringify(updatedLinks));
          setShowCustomName(false);
          customNameRef.current.value = "";
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
    <div className="flex flex-col pt-8 bounce">
      <label
        htmlFor="url"
        className="text-white text-[24px] font-semibold pb-4"
      >
        Give it a Name
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
