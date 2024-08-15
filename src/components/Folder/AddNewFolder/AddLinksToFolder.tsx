import React from "react";
import ModalLink from "../../Layout/Modal/ModalLink";
import useAddLinksToFolder from "../../../hooks/useAddLinksToFolder";
import ExistingLinks from "./ExistingLinks";

const AddLinksToFolder = () => {
  const { handleChooseFromExistingLinks, showLinks } = useAddLinksToFolder();

  return (
    <div className="h-[250px]">
      <ModalLink />
      <div className="flex flex-col items-center mt-2 text-white">
        <p className="text-xs mt-2 text-black dark:text-slate-300">OR</p>
        <h2
          className="bg-primary-2/50 p-2 px-4 text-sm cursor-pointer hover:bg-primary-2 transition-all ease duration-300 rounded-md mt-2"
          onClick={handleChooseFromExistingLinks}
        >
          Choose from your existing links
        </h2>
      </div>
      {showLinks && <ExistingLinks />}
    </div>
  );
};

export default AddLinksToFolder;
