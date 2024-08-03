
import Menu from "../../Menu";
import AddNewFolder from "../../Folder/AddNewFolder";

const ModalFolder = () => {
  return (
    <div className="mt-6">
      <Menu text="Name, Add Links, View Links" />
      <AddNewFolder />
    </div>
  );
};

export default ModalFolder;
