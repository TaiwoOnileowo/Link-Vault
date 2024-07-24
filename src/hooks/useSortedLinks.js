import { filterLinks } from "../utils/filterLinks";
import { sortLinks } from "../utils/sortLinks";
import { useAppContext } from "../context/AppContext";
const useSortedLinks = () => {
  const { links } = useAppContext();
  const unnamedLinks = filterLinks(links,(link) => !link.url_name, (link) => !link.folder_name);
  const namedLinks = filterLinks(links, (link) => link.url_name, (link) => !link.folder_name);

  const sortedUnnamedLinks = sortLinks(unnamedLinks);
  const sortedNamedLinks = sortLinks(namedLinks);
  return {
    sortedNamedLinks,
    sortedUnnamedLinks,
  };
};

export default useSortedLinks