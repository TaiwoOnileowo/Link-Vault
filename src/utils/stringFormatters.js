export const getFormattedLink = (name) =>
  name?.length > 38 ? `${name?.substr(0, 38)} ...` : name;
export const getFormattedTitle = (name) =>
  name?.length > 45 ? `${name?.substr(0, 45)} ...` : name;

export const getFormattedDescription = (link) => {
  return link?.length > 65 ? link?.substr(0, 65) + " ..." : link;
};
