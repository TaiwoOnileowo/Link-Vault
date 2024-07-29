import { folderIcons } from "../../../../public/foldericons";
import { useModalIcon } from "../../../hooks";
const ModalIcon = () => {
  const { index, handleClick, handleClickDone } = useModalIcon();

  return (
    <div className="relative mt-6 px-4">
      <div className="grid scrollbar  grid-cols-3 gap-2 h-[200px]">
        {folderIcons.map((icon, i) => {
          return (
            <div
              key={i}
              className={`${
                index === i && "dark:bg-white bg-primary-1 bg-opacity-40"
              } p-2 flex items-center justify-center cursor-pointer rounded-lg`}
              onClick={() => {
                handleClick(icon, i);
              }}
            >
              <img src={icon} alt="icon" className="w-12 h-10 " />
            </div>
          );
        })}
      </div>
      <div className="right-0 bottom-0 w-full flex justify-end">
        <button
          className="px-4 mt-4 py-2 bg-primary-2 text-white rounded-lg"
          onClick={() => handleClickDone()}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ModalIcon;
