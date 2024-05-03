import React from "react";
import { nanoid } from "nanoid";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";


const UnnamedLinks = ({
  unnamedLinks,
  handleMouseEnter,
  handleMouseLeave,
  handleCopy,
  handleDelete,
  hoveredIndex,
  copiedIndex,
  links,
}) => {

  const getFormattedLink = (link) => {
    const formattedLinks =
      link.length > 40 ? link.substr(0, 40) + " ..." : link;
    return formattedLinks;
  };

  return (
    <>
      <ul className="list-disc text-white list-inside pt-12">
        {unnamedLinks.map((link, index) => (
          <li key={nanoid()} className="text-[18px] mt-2">
            <div
              className="inline-flex items-center gap-4"
              onMouseEnter={() => handleMouseEnter(links.indexOf(link))}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href={`${
                  link.url.startsWith("https") || link.url.startsWith("http")
                    ? link.url
                    : "https://" + link.url
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-url"
              >
                {getFormattedLink(link.url)}
              </a>{" "}
              <AiOutlineDelete
                className="cursor-pointer"
                onClick={() => handleDelete(links.indexOf(link))}
              />
              {hoveredIndex === links.indexOf(link) && (
                <button
                  className="ml-2 border-white border rounded-[5px] px-2 copy "
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

export default UnnamedLinks;
