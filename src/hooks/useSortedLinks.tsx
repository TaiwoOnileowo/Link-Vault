import { sortLinks } from "../utils/sortLinks";
import { useAppContext } from "../context";
const useSortedLinks = () => {
  const { links } = useAppContext();
  // const unnamedLinks = filterLinks(links,(link) => !link.url_name, (link) => !link.folder_name)
  const unnamedLinks = links.filter((link:{
    url_name: string;
  }) => !link.url_name);
  const namedLinks = links.filter((link:{
    url_name: string;
  }) => link.url_name);

  const sortedUnnamedLinks = sortLinks(unnamedLinks);
  const sortedNamedLinks = sortLinks(namedLinks);
  return {
    sortedNamedLinks,
    sortedUnnamedLinks,
  };
};

export default useSortedLinks;
