import React from "react";
import { useAppContext } from "../../Context/AppContext";

const Menu = () => {
  const { menu, setMenu } = useAppContext();

  return (
    <div className="pt-8">
      <div className="flex gap-4">
        <menu onClick={() => setMenu("unnamed")} className="cursor-pointer">
          <h2
            className={`text-[18px] font-semibold ${
              menu === "unnamed"
                ? "text-[#2aa4eb] dark:text-[#65a4eb]"
                : "text-black dark:text-gray-300"
            }`}
          >
            Unnamed
          </h2>
          <hr
            className={`border-[2px] rounded-sm border-[#2aa4eb] mt-2 ${
              menu === "unnamed" ? "block" : "hidden"
            } `}
          />
        </menu>
        <menu onClick={() => setMenu("named")} className="cursor-pointer">
          <h2
            className={`text-[18px] font-semibold ${
              menu === "named"
                ? "text-[#2aa4eb] dark:text-[#65a4eb]"
                : "text-black dark:text-gray-300"
            }`}
          >
            Named
          </h2>
          <hr
            className={`border-[2px] rounded-sm border-[#2aa4eb] mt-2 ${
              menu === "named" ? "block" : "hidden"
            }`}
          />
        </menu>
        <menu onClick={() => setMenu("grouped")} className="cursor-pointer">
          <h2
            className={`text-[18px] font-semibold ${
              menu === "grouped"
                ? "text-[#2aa4eb] dark:text-[#65a4eb]"
                : "text-black dark:text-gray-300"
            }`}
          >
            Grouped
          </h2>
          <hr
            className={`border-[2px] rounded-sm border-[#2aa4eb] mt-2 ${
              menu === "grouped" ? "block" : "hidden"
            }`}
          />
        </menu>
      </div>
      <hr className="border border-[#808080] opacity-50 -mt-[1.5px]" />
    </div>
  );
};

export default Menu;
