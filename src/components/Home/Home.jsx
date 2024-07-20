import React from "react";
import DisplayedLinks from "./DisplayedLinks";
import Menu from "./Menu";
import { useAppContext } from "../../Context/AppContext";
import { useLinkContext } from "../../Context/LinkContext";
import Tags from "./Tags";
import Display from "../Layout/Display";

const Home = () => {
  const { menu } = useAppContext();
  const { sortedNamedLinks, sortedUnnamedLinks } = useLinkContext();

  const displayedLinks =
    menu === "Named" ? sortedNamedLinks : sortedUnnamedLinks;
  return (
    <div className="p-2 w-full mb-20">
      <Menu text="Unnamed, Named, Tags" />
      {menu === "Tags" ? (
        <Tags />
      ) : (
        <Display display={displayedLinks}>
          <DisplayedLinks display={displayedLinks} />
        </Display> 
      )}
    </div>
  );
};

export default Home;
