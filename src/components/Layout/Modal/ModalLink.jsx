import React, { useState } from "react";
import { useAppContext } from "../../../Context/AppContext";
import toast from "react-hot-toast";
import { styles } from "../../styles";
import { useLinkContext } from "../../../Context/LinkContext";
import { useFolderContext } from "../../../Context/FolderContext";

const ModalLink = () => {
  const {
    handleClose,
    setLinks,
    links,
    setMenu,
    inputs,
    setInputs,
    modalText,
    editIndex,
    setFolderInputs,
    folderInputs,
    setFolders,
  } = useAppContext();
  const { setShowCheckboxes, isFolderLinks } = useLinkContext();
  const { index: folderIndex } = useFolderContext();
  const [bounce, setBounce] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.url) {
      let updatedLinks = [...links];

      if (modalText.includes("Edit Link")) {
        if (isFolderLinks) {
          setFolders((prevFolders) =>
            prevFolders.map((folder, i) => {
              if (i === folderIndex) {
                return {
                  ...folder,
                  links: folder.links.map((link, j) => {
                    if (j === editIndex) {
                      return { ...inputs };
                    }
                    return link;
                  }),
                };
              }
              return folder;
            })
          );
          toast.success("Edited successfully!");
        } else {
          updatedLinks[editIndex] = { ...inputs };
          setLinks(updatedLinks);
          localStorage.setItem("Links", JSON.stringify(updatedLinks));
          toast.success("Edited successfully!");
        }
        setInputs({
          url: "",
          url_name: "",
          tags: "",
        });
        handleClose();
      } else if (modalText.includes("Folder")) {
        
        setFolderInputs({
          ...folderInputs,
          links: [inputs, ...folderInputs.links],
        });
        toast.success("Added to folder");
      } else {
        updatedLinks = [inputs, ...updatedLinks];
        const sortedUpdatedLinks = updatedLinks.sort(
          (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
        );
        setLinks(sortedUpdatedLinks);
        localStorage.setItem("Links", JSON.stringify(sortedUpdatedLinks));
        toast.success("Saved successfully!");
        inputs.url_name ? setMenu("Named") : setMenu("Unnamed");
        handleClose();
      }
      setInputs({
        url: "",
        url_name: "",
        tags: "",
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
    <form
      className="flex flex-col"
      onSubmit={handleSubmit}
      id="modal-link-form"
    >
      <div className={styles.formGroup}>
        <div className="flex gap-2 items-center">
          <label htmlFor="url" className={`${styles.label} inline-flex gap-1`}>
            Url:
            <span className="text-xs text-red-500">*</span>
          </label>
          {!modalText.includes("Edit Link") && (
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
          Tags (separated by comma, Optional):
        </label>
        <input
          type="text"
          name="tags"
          id="tags"
          value={inputs.tags}
          className={styles.input}
          onChange={handleChange}
        />
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
