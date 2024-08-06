import { sortLinks } from "../utils/sortLinks";
import { useAppContext } from "../context";
import { Links } from "../types";

const useSortedLinks = () => {
  const context = useAppContext();
  
  if (!context) {
    // Return default values or throw an error if context is not available
    throw new Error("useSortedLinks must be used within an AppProvider");
  }

  const { links } = context;

  const unnamedLinks: Links[] = links.filter((link) => !link.url_name);
  const namedLinks: Links[] = links.filter((link) => !!link.url_name);

  const sortedUnnamedLinks: Links[] = sortLinks(unnamedLinks);
  const sortedNamedLinks: Links[] = sortLinks(namedLinks);

  return {
    sortedNamedLinks,
    sortedUnnamedLinks,
  };
};

export default useSortedLinks;
