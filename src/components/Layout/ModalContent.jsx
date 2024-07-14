import React, { useState } from "react";
import Modal from "../Modal";
import toast from "react-hot-toast";
import { useAppContext } from "../../Context/AppContext";
import { useLinkContext } from "../../Context/LinkContext";
const ModalContent = () => {
  const {
    handleClose,
    setLinks,
    links,
    setMenu,
    inputs,
    setInputs,
    modalText,
    linkDetails,
  } = useAppContext();
  const { setShowCheckboxes } = useLinkContext();
  const [bounce, setBounce] = useState(false);

  const styles = {
    button1:
      "bg-primary text-white text-sm py-1 px-4 border-none font-bold cursor-pointer rounded-[4px] my-[10px] hover:bg-hoverPrimary hover:scale-[1.02] transition-all duration-300 ease-in-out",
    button2:
      "bg-white text-sm text-primary py-1 px-4 border-none font-bold cursor-pointer rounded-[4px] my-[10px] hover:bg-lightBorder hover:scale-[1.02] transition-all duration-300 ease-in-out",

    input:
      "p-4 py-2 h-[35px] rounded-md bg-lightBackground hover:bg-[#d5ebff] outline-none text-sm text-black",

    formGroup: "flex flex-col gap-2 mb-2",
    label: "text-black text-sm dark:text-white font-bold",
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const sortedLinks = links.sort((a, b) => b.pinned - a.pinned);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.url) {
      let updatedLinks = [...links]; // Start with a copy of the current links

      if (modalText === "Add New Link") {
        updatedLinks = [
          {
            url: inputs.url,
            url_name: inputs.url_name,
            // tags: inputs.tags.split(","),
            pinned: inputs.pinned,
            selected: inputs.selected,
          },
          ...sortedLinks,
        ];
        toast.success("Saved successfully!");
      } else {
        // Find the index of the link being edited
        const index = links.findIndex((link) => link.url === linkDetails.url);
        if (index !== -1) {
          // Replace the link at the found index with the updated link details
          updatedLinks[index] = {
            url: inputs.url,
            url_name: inputs.url_name,
            // tags: inputs.tags.split(","),
            pinned: inputs.pinned,
            selected: inputs.selected,
          };
          toast.success("Edited successfully!");
        } else {
          // Handle the case where the link is not found (shouldn't happen normally)
          toast.error("Link not found for editing!");
          return; // Exit the function early
        }
      }

      setLinks(updatedLinks);
      localStorage.setItem("Links", JSON.stringify(updatedLinks));
      inputs.url_name ? setMenu("named") : setMenu("unnamed");
      setInputs({
        url: "",
        url_name: "",
        tags: "",
        pinned: false,
        selected: false,
      });

      handleClose();
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
  return (
    <Modal>
      <>
        {modalText.includes("Delete") ? (
          <div className="flex gap-4 justify-center">
            <button
              className={styles.button1}
              onClick={() => {
                setLinks((prevLinks) =>
                  prevLinks.filter((link) => !link.selected)
                );
                const updatedLinks = links.filter((link) => !link.selected);
                localStorage.setItem("Links", JSON.stringify(updatedLinks));
                handleClose();
                setShowCheckboxes(false);
                toast.success("Deleted successfully!");
              }}
            >
              Yes
            </button>
            <button
              className={styles.button2}
              onClick={() => {
                setLinks((prevLinks) =>
                  prevLinks.map((link) => ({ ...link, selected: false }))
                );
                handleClose();
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <div className="flex gap-2 items-center">
                <label
                  htmlFor="url"
                  className={`${styles.label} inline-flex gap-1`}
                >
                  Url:
                  <span className="text-xs text-red-500">*</span>
                </label>
                {modalText === "Add New Link" && (
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
              <input
                type="text"
                name="tags"
                id="tags"
                className={styles.input}
              />
            </div>
            <div className="flex justify-start gap-2">
              <button className={styles.button1} type="submit">
                Save
              </button>
              <button
                className={styles.button2}
                type="button"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </>
    </Modal>
  );
};

export default ModalContent;
