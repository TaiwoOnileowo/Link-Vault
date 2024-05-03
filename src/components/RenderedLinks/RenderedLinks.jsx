import React, { useState } from "react";

import UnnamedLinks from "./UnnamedLinks";
import NamedLinks from "./NamedLinks";

const RenderedLinks = ({ links, setLinks }) => {
  const namedLinks = links.filter((link) => link.url_name);
  const unnamedLinks = links.filter((link) => !link.url_name);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleDelete = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
    localStorage.setItem("Links", JSON.stringify(newLinks));
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setHoveredIndex(null);
    }, 3000);
  };

  const handleCopy = (url, index) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
      setHoveredIndex(null);
    }, 3000);
  };

  return (
    <div className="pb-12 px-8">
      {links.length> 0 ? (
        <>
          {console.log(links)}
          {unnamedLinks.length > 0 && (
            <UnnamedLinks
              unnamedLinks={unnamedLinks}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              handleCopy={handleCopy}
              handleDelete={handleDelete}
              links={links}
              hoveredIndex={hoveredIndex}
              copiedIndex={copiedIndex}
            />
          )}
          {namedLinks.length > 0 && (
            <div className="pt-12 ">
              <h2 className="text-white text-[24px] pb-4 font-semibold">
                Custom Name
              </h2>
              <NamedLinks
                namedLinks={namedLinks}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleCopy={handleCopy}
                handleDelete={handleDelete}
                links={links}
                hoveredIndex={hoveredIndex}
                copiedIndex={copiedIndex}
              />
            </div>
          )}
        </>
      ) : (
        <div className="bg-[#242425] bg-opacity-50 flex items-center justify-center py-[10px] mt-4 shadow-xl">
  <h2 className="text-white text-[24px] font-semibold pb-4">
    No Links Saved
  </h2>
</div>
       
      )}
    </div>
  );
};

export default RenderedLinks;
