export const sortLinks = (links) => {
  const pinned = links.filter((link) => link.pinned);
  const notPinned = links.filter((link) => !link.pinned);
  return [...pinned, ...notPinned];
};