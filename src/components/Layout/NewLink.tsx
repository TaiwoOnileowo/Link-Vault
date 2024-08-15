import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useAppContext, useModalContext } from "../../context";
import React from "react";
import { AppContextType, ModalContextType } from "../../types";
const NewLink = () => {
  const [bounce, setBounce] = useState(false);
  const { openModal } = useModalContext() as ModalContextType;
  const { route } = useAppContext() as AppContextType;
  const isFolder = route === "Folder";
  return (
    <div
      onClick={() => {
        setBounce(true);
        setTimeout(() => {
          setBounce(false);
        }, 300);
        openModal("Save New Link", null, null, null, isFolder);
      }}
      title="Add New Link"
      className={`${
        bounce ? "animate-bounce" : null
      } bg-primary-2 w-[35px] h-[35px] rounded-l-2xl fixed right-0 bottom-[15%] cursor-pointer hover:bg-[#3a61e2] flex items-center justify-center text-white`}
    >
      <FaPlus />
    </div>
  );
};

export default NewLink;
