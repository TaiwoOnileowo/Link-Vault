/* eslint-disable no-undef */
export const getInitialLinks = () => {
  // return new Promise((resolve) => {
  //   chrome.storage.local.get(["Links"], (result) => {
  //     let links = result.Links || [];
  //     resolve(links);
  //   });
  // });
  return JSON.parse(localStorage.getItem("Links"));
};

export const getInitialFolders = () => {
  // return new Promise((resolve) => {
  //   chrome.storage.local.get(["Folders"], (result) => {
  //     let folders = result.Folders || [];
  //     resolve(folders);
  //   });
  // });
  return JSON.parse(localStorage.getItem("Folders"));
};

export const updateStorage = (key, value) => {
  // return new Promise((resolve) => {
  //   chrome.storage.local.set({ [key]: value }, () => {
  //     resolve();
  //   });
  // });
  localStorage.setItem(key, JSON.stringify(value));
};
// or
// export const updateStorage = (key, value) => {
//   chrome.storage.local.set({ [key]: value }, () => {
//     console.log('Storage updated successfully');
//   });
// };
//which is better and why?
//I think the first one is better because it returns a promise that can be used to handle the success or failure of the operation.
//I dont want to wait for the setting to storage to be done, I just want to set it and forget it, so which do I use
//I think the second one is better because it is more concise and easier to read. It also does not require the use of a promise, which can be confusing for some developers.
