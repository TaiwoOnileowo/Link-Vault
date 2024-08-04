/* eslint-disable no-undef */
export const getInitialLinks = () => {
  // return new Promise((resolve) => {
  //   chrome.storage.local.get(["Links"], (result) => {
  //     let links = result.Links || [];
  //     resolve(links);
  //   });
  // });
  const links = localStorage.getItem("Links");
  const parsedLinks = links ? JSON.parse(links) : [];
  return parsedLinks;
};

export const getInitialFolders = () => {
  // return new Promise((resolve) => {
  //   chrome.storage.local.get(["Folders"], (result) => {
  //     let folders = result.Folders || [];
  //     resolve(folders);
  //   });
  // });
  const folders = localStorage.getItem("Folders");
  const parsedFolders = folders ? JSON.parse(folders) : [];
  return parsedFolders;
};

export const updateStorage = (key: string, value: any) => {
  // return new Promise((resolve) => {
  //   chrome.storage.local.set({ [key]: value }, () => {
  //     resolve();
  //   });
  // });
  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteStorage = (key: string) => {
  // return new Promise((resolve) => {
  //   chrome.storage.local.remove(key, () => {
  //     resolve();
  //   });
  // });
  localStorage.setItem(key, JSON.stringify([]));
};
