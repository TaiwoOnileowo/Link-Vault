import { useAppContext } from "./context";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import Folder from "./components/Folder";
const App = () => {
  const { routes } = useAppContext();

  return (
    <>
      {routes.search && <SearchResults />}
      {routes.home && <Home />}
      {routes.folders && <Folder />}
    </>
  );
};

export default App;
