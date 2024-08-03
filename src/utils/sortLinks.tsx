export const sortLinks = (links: { pinned?: boolean }[]) => {
  const pinned = links.filter((link) => link.pinned);
  const notPinned = links.filter((link) => !link.pinned);
  return [...pinned, ...notPinned];
};
