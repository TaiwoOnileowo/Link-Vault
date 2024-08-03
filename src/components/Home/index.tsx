import DisplayedLinks from "./DisplayedLinks";
import Menu from "../Menu";
import { useAppContext } from "../../context";
import { useLinkContext } from "../../context";
// import Tags from "./Tags";
import Display from "../Layout/Display";

const Home = () => {
  const { menu, links } = useAppContext();
  const { namedLinks, unnamedLinks } = useLinkContext();
  // const unnamedLinks = links.filter((link) => !link.url_name);
  // const namedLinks = links.filter((link) => link.url_name);
  const displayedLinks = menu === "Named" ? namedLinks : unnamedLinks;
  // menu === "Named" ? sortedNamedLinks : sortedUnnamedLinks;
  return (
    <div className="p-2 w-full mb-20">
      <Menu text="Unnamed, Named" />
      {/* {menu === "Tags" ? (
        <Tags />
      ) : ( */}
      <>
        <Display display={displayedLinks}>
          <DisplayedLinks display={displayedLinks} />
        </Display>
      </>
      {/* )} */}
    </div>
  );
};

export default Home;
