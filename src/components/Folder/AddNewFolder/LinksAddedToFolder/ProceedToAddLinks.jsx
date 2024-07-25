import React from "react";
import { useProceedToAddLinks } from "../../../../hooks";
const ProceedToAddLinks = ({ showModal }) => {
  const { handleClick } = useProceedToAddLinks();
  return (
    <h1 className="text-dimWhite font-medium text-xs my-2">
      Empty folder, proceed to{" "}
      <span
        className="underline text-primary cursor-pointer"
        onClick={() => handleClick(showModal, null)}
      >
        add links
      </span>
    </h1>
  );
};

export default ProceedToAddLinks;
