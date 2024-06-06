import React, { useState, memo } from "react";
import Input from "./Input";
import CustomNameInput from "./CustomNameInput";

const Inputs = ({ links, setLinks, setShowAdd, setMenu,  }) => {
  const [showCustomName, setShowCustomName] = useState(false);
  const [urlInput, seturlInput] = useState("");
  const [buttonClicked, setButtonClicked] = useState("");
  console.log("Input ")
  return (
    <div className="w-full px-6  mt-6">
      <Input
        seturlInput={seturlInput}
        setShowCustomName={setShowCustomName}
        setButtonClicked={setButtonClicked}
        setLinks={setLinks}
        setShowAdd={setShowAdd}
        setMenu={setMenu}
      />
      {showCustomName && (
        <CustomNameInput
          links={links}
          setLinks={setLinks}
          setShowCustomName={setShowCustomName}
          buttonClicked={buttonClicked}
          urlInput={urlInput}
          setShowAdd={setShowAdd}
          setMenu={setMenu}
        />
      )}
    </div>
  );
};

export default Inputs;
