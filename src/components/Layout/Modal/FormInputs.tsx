import React from "react";
import FormInput from "../../FormInput";
import { useModalLink } from "../../../hooks";
import { useModalContext } from "../../../context";
import { ModalContextType } from "../../../types";
const FormInputs = ({ error }: { error: string | null }) => {
  const { handleChange, mountedModal } = useModalLink();
  const { inputs } = useModalContext() as ModalContextType;
  console.log(error);
  return (
    <>
      <FormInput
        label="Url"
        type="text"
        name="url"
        value={inputs.url}
        extraLabelClass="inline-flex gap-2"
        showSaveTab={!mountedModal && true}
        onChange={handleChange}
        error={error === null ? undefined : error}
      />
      <div className="mt-2">
        <FormInput
          label="Custom Name (Optional)"
          type="text"
          name="url_name"
          value={inputs.url_name}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default FormInputs;
