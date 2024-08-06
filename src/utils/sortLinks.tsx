import { Links } from "../types";
export const sortLinks = (links: Links[]) => {
  const pinned = links.filter((link) => link.pinned);
  const notPinned = links.filter((link) => !link.pinned);
  return [...pinned, ...notPinned];
};
