export const getFormattedName = (name) =>
  name.length > 38 ? `${name.substr(0, 38)} ...` : name;

export const getFormattedLink = (link) => {
  return link.length > 40 ? link.substr(0, 40) + " ..." : link;
};
