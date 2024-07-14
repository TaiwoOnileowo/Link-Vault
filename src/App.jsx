import React from "react";
import { useAppContext } from "./Context/AppContext";
import Home from "./components/Home/Home";
import SearchResults from "./components/SearchResults";

import Folder from "./components/Folder/Folder";
const App = () => {
  const { routes } = useAppContext();
  console.log(routes);
  return (
    <>
      {routes.search && <SearchResults />}
      {routes.home && <Home />}
      {routes.folders && <Folder />}
    </>
  );
};

export default App;
