import { goTo } from "react-chrome-extension-router";
import { FaPlus } from "react-icons/fa6";
import { useAppContext, useModalContext } from "../../context";
import React from "react";
import { motion } from "framer-motion";
import { AppContextType, ModalContextType } from "../../types";
import Home from "../Home";
const NewLink = () => {
  const { openLinkModal } = useModalContext() as ModalContextType;
  const { setRoute } = useAppContext() as AppContextType;
  return (
    <motion.div
      onClick={() => {
        openLinkModal("Save New Link", null);
        goTo(Home);
        setRoute("Home");
      }}
      whileTap={{ scale: 0.9 }}
      title="Add New Link"
      className={` bg-primary-2 w-[35px] h-[35px] rounded-l-2xl fixed right-0 bottom-[15%] cursor-pointer hover:bg-[#3a61e2] flex items-center justify-center text-white`}
    >
      <FaPlus />
    </motion.div>
  );
};

export default NewLink;
