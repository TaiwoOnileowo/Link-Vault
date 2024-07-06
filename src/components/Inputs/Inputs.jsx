import React from "react";
import Input from "./Input";
import CustomNameInput from "./CustomNameInput";
import { useInputsContext } from "../../Context/InputsContext";

const Inputs = () => {
  const { showCustomName } = useInputsContext();

  return (
    <div className="w-full px-2  mt-6">
      {showCustomName ? <CustomNameInput /> : <Input />}
    </div>
  );
};

export default Inputs;
