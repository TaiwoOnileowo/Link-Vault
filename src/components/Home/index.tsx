import DisplayedLinks from "./DisplayedLinks";
import Menu from "../Menu";
import { useAppContext } from "../../context";
import { useLinkContext } from "../../context";
// import Tags from "./Tags";
import Display from "../Layout/Display";
import { getFromLocalStorage } from "../../utils/storage";
const Home = () => {
  const { menu, links , sessionid} = useAppContext();
  const { namedLinks, unnamedLinks } = useLinkContext();

  console.log("sessionId", sessionid);
  const displayedLinks = menu === "Named" ? namedLinks : unnamedLinks;
  // menu === "Named" ? sortedNamedLinks : sortedUnnamedLinks;
  return (
    <div className="p-2 w-full mb-20">
      <Menu text="Unnamed, Named" />
      {sessionid ? <p className="text-white text-2xl font-bold">Logged Innnnnn</p> : <p className="text-white text-2xl font-bold">Logged Outttttt</p>}
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
