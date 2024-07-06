import React from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../Context/AppContext";
import { styles } from "../style";

const Warning = () => {
  const { setShowWarning, setLinks, darkMode } = useAppContext();

  const handleClearAll = () => {
    setLinks([]);
    localStorage.clear();
    setShowWarning(false);
    toast.success("Deleted Successfully");
  };

  return (
    <div className={`bg-${darkMode ? 'dark' : 'white'} h-[50%] bg-opacity-50 flex flex-col gap-2 items-center justify-center py-4 m-6 shadow-sm hover:shadow-2xl transition-all ease-in duration-300`}>
      <h2 className={`text-${darkMode ? 'white' : 'black'} text-[20px] font-semibold`}>
        Delete All Links. Sure?
      </h2>
      <div className="flex gap-4">
        <button
          className={`${styles.button2} text-[14px] py-1`}
          onClick={() => setShowWarning(false)}
        >
          No
        </button>
        <button
          className={`${styles.button1} text-[14px] py-1`}
          onClick={handleClearAll}
        >
          Yeah
        </button>
      </div>
    </div>
  );
};

export default Warning;
