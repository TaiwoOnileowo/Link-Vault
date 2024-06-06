import React, { useState, useCallback, memo } from "react";
import UnnamedLinks from "./UnnamedLinks";
import NamedLinks from "./NamedLinks";
import Grouped from "./Grouped";
import SearchResults from "./SearchResults";
import Menu from "./Menu";
import { FaBeerMugEmpty } from "react-icons/fa6";
import toast from "react-hot-toast";

const RenderedLinks = memo(({ links, setLinks, searchInput, menu, setMenu }) => {
  const [inputIndex, setInputIndex] = useState(null);
  const [editedValue, setEditedValue] = useState("");


  const handleSubmit = useCallback((index, value, isEdit = false) => {
    const updatedLinks = links.map((link, i) =>
      i === index ? { ...link, ...(isEdit ? { url: value } : { url_name: value }) } : link
    );
    console.log(index)
    console.log(links)
    console.log(updatedLinks)
    console.log(value)
    if (value) {
      setLinks(updatedLinks);
      localStorage.setItem("Links", JSON.stringify(updatedLinks));
      setInputIndex(null);
      if (!isEdit) setMenu("named");
      toast.success("Edited");
    }
  }, [links, setLinks, setMenu]);

  const handleCopyToClipboard = useCallback(async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  }, []);

  const handleDelete = useCallback((index) => {
    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks.splice(index, 1);
      localStorage.setItem("Links", JSON.stringify(newLinks));
      return newLinks;
    });
    toast.success("Deleted");
  }, [setLinks]);

  return (
    <div className="pb-12 px-6">
      {searchInput && (
        <SearchResults
          searchInput={searchInput}
          links={links}
          handleCopy={handleCopyToClipboard}
          handleDelete={handleDelete}
          handleSubmit={handleSubmit}
          inputIndex={inputIndex}
          setInputIndex={setInputIndex}
          editedValue={editedValue}
          setEditedValue={setEditedValue}
        />
      )}
      {!searchInput && (
        <>
          {links.length > 0 && <Menu menu={menu} setMenu={setMenu} />}
          {!links.length && (
            <div className="bg-[#242425] bg-opacity-50 items-center gap-4 flex flex-col justify-center py-[10px] mt-4 shadow-xl">
              <FaBeerMugEmpty className="w-24 h-24 text-[#d5ebff]" />
              <h2 className="text-white text-[28px] font-semibold pb-4">
                No Links Saved😐
              </h2>
            </div>
          )}
        </>
      )}
      {menu === "unnamed" && !searchInput && (
        <UnnamedLinks
          links={links}
          editedValue={editedValue}
          inputIndex={inputIndex}
          handleCopy={handleCopyToClipboard}
          handleDelete={handleDelete}
          handleSubmit={handleSubmit}
          setInputIndex={setInputIndex}
          setEditedValue={setEditedValue}
        />
      )}
      {menu === "named" && !searchInput && (
        <NamedLinks
          links={links}
          editedValue={editedValue}
          handleCopy={handleCopyToClipboard}
          handleDelete={handleDelete}
          handleSubmit={handleSubmit}
          setEditedValue={setEditedValue}
          inputIndex={inputIndex}
          setInputIndex={setInputIndex}
        />
      )}
      {menu === "grouped" && <Grouped />}
    </div>
  );
});

export default memo(RenderedLinks);
