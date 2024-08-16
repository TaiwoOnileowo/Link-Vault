import React from "react";
import FormInputs from "../../Layout/Modal/FormInputs";
import useAddLinksToFolder from "../../../hooks/useAddLinksToFolder";
import ExistingLinks from "./ExistingLinks";
import Button from "../../Button";
import { useAppContext } from "../../../context";
import { AppContextType } from "../../../types";
import { styles } from "../../../styles";
const AddLinksToFolder = () => {
  const { handleChooseFromExistingLinks, error, showLinks, handleSubmit } =
    useAddLinksToFolder();
  const { setMenu } = useAppContext() as AppContextType;
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <FormInputs error={error} />
        <div className="flex justify-end gap-2">
          <Button title="Add" type="submit" />
          <Button
            title="View links"
            type="button"
            handleClick={() => setMenu("View Links")}
            animate={false}
            className={styles.button2}
          />
        </div>
      </form>

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
