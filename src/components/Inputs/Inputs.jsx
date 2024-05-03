import React, { useState } from "react";
import Input from "./Input";
import CustomNameInput from "./CustomNameInput";

const Inputs = ({ links, setLinks }) => {
  const [showCustomName, setShowCustomName] = useState(false);
  const [urlInput, seturlInput] = useState("");
  const [buttonClicked, setButtonClicked] = useState("");
  return (
    <div className="w-full px-8 pt-12">
      <Input
        seturlInput={seturlInput}
        setShowCustomName={setShowCustomName}
        setButtonClicked={setButtonClicked}
        setLinks={setLinks}
      />
      {showCustomName && (
        <CustomNameInput
          links={links}
          setLinks={setLinks}
          setShowCustomName={setShowCustomName}
          buttonClicked={buttonClicked}
          urlInput={urlInput}
        />
      )}
    </div>
  );
};

export default Inputs;
