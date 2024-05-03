import React from "react";
import { nanoid } from "nanoid";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
const NamedLinks = ({
    namedLinks,
    handleMouseEnter,
    handleMouseLeave,
    handleCopy,
    handleDelete,
    hoveredIndex,
    copiedIndex,
    links,
}) => {
  return (
    <>
      <ul className="list-disc text-white list-inside ">
        {namedLinks.map((link, index) => (
          <li
            key={nanoid()}
            className="text-[18px]  mt-2 "
            onMouseEnter={() => handleMouseEnter(links.indexOf(link))}
            onMouseLeave={handleMouseLeave}
          >
            <div className="gap-4 inline-flex items-center ">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.url_name}
              </a>{" "}
              <AiOutlineDelete
                className="cursor-pointer"
                onClick={() => handleDelete(links.indexOf(link))}
              />
              {hoveredIndex === links.indexOf(link) && (
                <button
                  className="ml-2 border-white border rounded-[5px] px-2 copy"
                  onClick={() => handleCopy(link.url, links.indexOf(link))}
                >
                  {copiedIndex === links.indexOf(link) ? (
                    <FaCheck
                      className={`my-[2px] mx-[2px] text-[#2a4ff6] copy-button`}
                    />
                  ) : (
                    "copy"
                  )}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NamedLinks;
