import React from "react";
import { nanoid } from "nanoid";
import { AiOutlineDelete } from "react-icons/ai";
const Body = ({ links, handleDelete }) => {
  const namedLinks = links.filter((link) => link.url_name);
  const unnamedLinks = links.filter((link) => !link.url_name);

  const getFormattedLink = (link) => {
    const formattedLinks = link.length > 45 ? link.substr(0, 45)  + " ..." : link;
    return formattedLinks
  };
  return (
    <div className="pb-24 px-8">
      {unnamedLinks.length > 0 && (
        <ul className="list-disc text-white  list-inside pt-12">
          {unnamedLinks.map((link, index) => (
            <li key={nanoid()} className="text-[18px]">
              <div className="inline-flex items-center gap-4">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-url"
                >
                  {getFormattedLink(link.url)}
                </a>{" "}
                <AiOutlineDelete
                  className="cursor-pointer"
                  onClick={() => handleDelete(index)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
      {namedLinks.length > 0 && (
        <div className="pt-12 ">
          <h2 className="text-white text-[24px] pb-4 font-semibold">
            Custom Name
          </h2>
          <ul className="list-disc text-white list-inside ">
            {namedLinks.map((link, index) => (
              <li key={nanoid()} className="text-[18px] ">
                <div className="gap-4 inline-flex items-center ">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.url_name}
                  </a>{" "}
                  <AiOutlineDelete
                    className="cursor-pointer"
                    onClick={() => handleDelete(index)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Body;
