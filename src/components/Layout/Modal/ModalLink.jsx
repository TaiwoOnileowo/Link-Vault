import React, { useState } from "react";
import { useAppContext } from "../../../Context/AppContext";
import toast from "react-hot-toast";
import { styles } from "../../styles";
import { useLinkContext } from "../../../Context/LinkContext";
const ModalLink = () => {
  const {
    handleClose,
    setLinks,
    links,
    setMenu,
    inputs,
    setInputs,
    modalText,
    linkDetails,
    setFolderInputs,
    folderInputs,
  } = useAppContext();
  const { setShowCheckboxes } = useLinkContext();

  const [bounce, setBounce] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.url) {
      let updatedLinks = [...links]; // Start with a copy of the current links

      if (modalText.includes("Edit")) {
        // Find the index of the link being edited
        const index = links.findIndex((link) => link.url === linkDetails.url);
        if (index !== -1) {
          // Replace the link at the found index with the updated link details
          updatedLinks[index] = { ...inputs };
          toast.success("Edited successfully!");
        } else {
          // Handle the case where the link is not found (shouldn't happen normally)
          toast.error("Link not found for editing!");
          return; // Exit the function early
        }
        setLinks(updatedLinks);
        localStorage.setItem("Links", JSON.stringify(updatedLinks));
        setInputs({
          url: "",
          url_name: "",
          tags: "",
          folder_name: "",
        });
        handleClose();
      } else if (modalText.includes("Folder")) {
        setFolderInputs({
          ...folderInputs,
          links: [inputs, ...folderInputs.links],
          manually_added: true,
        });
        toast.success("Added to folder");
      } else {
        updatedLinks = [inputs, ...updatedLinks];
        console.log(updatedLinks);
        const sortedUpdatedLinks = updatedLinks.sort(
          (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
        );
        toast.success("Saved successfully!");
        inputs.url_name ? setMenu("Named") : setMenu("Unnamed");
        handleClose();
        setLinks(sortedUpdatedLinks);
        localStorage.setItem("Links", JSON.stringify(sortedUpdatedLinks));
      }
      setInputs({
        url: "",
        url_name: "",
        tags: "",
        folder_name: "",
      });
    }
  };

  const getCurrentTab = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  };

  const handleSaveTab = () => {
    getCurrentTab().then((tab) => {
      setInputs({ ...inputs, url: tab.url });
    });
  };
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <div className="flex gap-2 items-center">
          <label htmlFor="url" className={`${styles.label} inline-flex gap-1`}>
            Url:
            <span className="text-xs text-red-500">*</span>
          </label>
          {!modalText.includes("Edit") && (
            <button
              className={`text-sm text-white bg-primary px-2 rounded-md hover:bg-hoverPrimary ${
                bounce ? "animate-bounce" : null
              }`}
              onClick={() => {
                setBounce(true);
                setTimeout(() => {
                  setBounce(false);
                }, 300);
                handleSaveTab();
              }}
              type="button"
            >
              Save Tab
            </button>
          )}
        </div>
        <input
          type="text"
          name="url"
          id="url"
          value={inputs.url}
          className={styles.input}
          onChange={handleChange}
        />
        {/* <p className="text-xs text-red-500">Url already exists in your vault</p> */}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="customName" className={styles.label}>
          Custom Name (Optional):
        </label>
        <input
          type="text"
          name="url_name"
          id="customName"
          value={inputs.url_name}
          className={styles.input}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="tags" className={styles.label}>
          Tags (seperated by comma, Optional):
        </label>
        <input type="text" name="tags" id="tags" className={styles.input} />
      </div>
      <div className="flex justify-start gap-2">
        <button className={styles.button1} type="submit">
          {modalText.includes("Folder") ? "Add" : "Save"}
        </button>
        <button
          className={styles.button2}
          type="button"
          onClick={() => {
            handleClose();
            setShowCheckboxes(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ModalLink;
