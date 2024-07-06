import React, { useState, useCallback, memo } from "react";
import UnnamedLinks from "./UnnamedLinks";
import NamedLinks from "./NamedLinks";
import Grouped from "./Grouped";
import SearchResults from "./SearchResults";
import Menu from "./Menu";
import { FaBeerMugEmpty } from "react-icons/fa6";
import { useAppContext } from "../../Context/AppContext";
const RenderedLinks = memo(() => {
  const { searchInput, links, menu } = useAppContext();

  return (
    <div className="pb-12 px-2 h-full mb-10 flex flex-col ">
      {searchInput && <SearchResults />}
      {!searchInput && (
        <>
          {links.length > 0 && <Menu />}
          {!links.length && (
            <div className="bg-[#242425] bg-opacity-50 items-center gap-4  h-[50%] flex flex-col justify-center py-[10px] mt-4 shadow-xl">
              <FaBeerMugEmpty className="w-24 h-24 text-[#d5ebff]" />
              <h2 className="text-white text-[28px] font-semibold pb-4">
                No Links Saved😐
              </h2>
            </div>
          )}
        </>
      )}
      {menu === "unnamed" && !searchInput && <UnnamedLinks />}
      {menu === "named" && !searchInput && <NamedLinks />}
      {menu === "grouped" && <Grouped />}
    </div>
  );
});

export default memo(RenderedLinks);
