import { useProceedToAddLinks } from "../../../../hooks";
import { useFolderContext, useAppContext } from "../../../../context";
import React from "react";
import {
  AppContextType,
  FolderContextType,
  ModalContextType,
} from "../../../../types";
import { useModalContext } from "../../../../context";
const ProceedToAddLinks = ({ showModal }: { showModal: boolean }) => {
  // const { handleClick } = useProceedToAddLinks();
  const { openFolderIndex, setOpenFolderIndex } =
    useFolderContext() as FolderContextType;
  const { openFolderModal } = useModalContext() as ModalContextType;
  const { setMenu } = useAppContext() as AppContextType;
  const handleClick = () => {
    openFolderModal("Save Links To Folder", openFolderIndex);
    setOpenFolderIndex(null);
    setMenu("Add Links");
  };

  return (
    <h1 className="dark:text-dimWhite text-black font-medium text-xs my-2">
      Empty folder, proceed to{" "}
      <span
        className="underline text-primary-2 cursor-pointer"
        onClick={handleClick}
      >
        add links
      </span>
    </h1>
  );
};

export default ProceedToAddLinks;
