import React from "react";
import DisplayedLinks from "./DisplayedLinks";
import Menu from "./Menu";
import { useAppContext } from "../../Context/AppContext";
import Tags from "./Tags";

const Home = () => {
  const { menu } = useAppContext();
  return (
    <div className="p-2 w-full">
      <Menu />

      {menu === "tags" ? <Tags /> : <DisplayedLinks />}
    </div>
  );
};

export default Home;
