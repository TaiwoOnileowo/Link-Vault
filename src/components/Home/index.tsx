import React from "react";
import DisplayedLinks from "./DisplayedLinks";
import Menu from "../Menu";
import { useAppContext } from "../../context";
import { useLinkContext } from "../../context";

import Display from "../Layout/Display";

import { AppContextType, LinkContextProps } from "../../types";
const Home = () => {
  const { menu } = useAppContext() as AppContextType;
  const { namedLinks, unnamedLinks } = useLinkContext() as LinkContextProps;

  const displayedLinks = menu === "Named" ? namedLinks : unnamedLinks;

  return (
    <>
      <div className="p-2 w-full mb-20">
        <Menu text="Unnamed, Named" />
        <>
          <Display display={displayedLinks}>
            <DisplayedLinks display={displayedLinks} />
          </Display>
        </>
        {/* )} */}
      </div>
    </>
  );
};

export default Home;
