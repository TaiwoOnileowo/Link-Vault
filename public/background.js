/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "local" && changes.Links) {
    chrome.runtime.sendMessage({ action: "updateLinks" });
  }
  if (namespace === "local" && changes.Folders) {
    chrome.runtime.sendMessage({ action: "updateFolders" });
  }
});

chrome.runtime.onInstalled.addListener(({ reason }) => {
  // Create context menu items
  let parent = chrome.contextMenus.create({
    title: "Save link to your vault",
    contexts: ["link"],
    id: "addlink",
  });

  chrome.contextMenus.create({
    title: "Save without a name",
    parentId: parent,
    contexts: ["link"],
    id: "addunnamed",
  });

  chrome.contextMenus.create({
    title: "Save with a Custom Name",
    parentId: parent,
    contexts: ["link"],
    id: "addnamed",
  });
  chrome.contextMenus.create({
    title: "Create a New Folder with link",
    parentId: parent,
    contexts: ["link"],
    id: "createfolder",
  });
  chrome.contextMenus.create({
    title: "Save link to an Existing Folder",
    parentId: parent,
    contexts: ["link"],
    id: "saveToExistingFolder",
  });

  // Handle installation
  if (reason === "install") {
    chrome.tabs.create({ url: "https://linkvaultapp.netlify.app/" });
  }

  // Set side panel behavior
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
});

// eslint-disable-next-line no-undef
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addunnamed") {
    const linkUrl = info.linkUrl;
    saveLinkToVault(linkUrl, "");
  } else if (info.menuItemId === "addnamed") {
    const linkUrl = info.linkUrl;
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (linkUrl) => {
        const linkName = prompt("Enter a name for the link:");
        if (linkName) {
          chrome.runtime.sendMessage({ linkUrl, linkName });
        }
      },
      args: [linkUrl],
    });
  } else if (info.menuItemId === "createfolder") {
    const linkUrl = info.linkUrl;
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (linkUrl) => {
        const folderName = prompt("Enter a name for the folder:");
        if (folderName) {
          chrome.runtime.sendMessage({
            linkUrl,
            folderName,
          });
        }
      },
      args: [linkUrl],
    });
  } else if (info.menuItemId === "saveToExistingFolder") {
    const linkUrl = info.linkUrl;
    chrome.storage.local.get(["Folders"], (result) => {
      const folders = result.Folders || [];
      const folderNames = folders
        .map((folder) => folder.folder_name)
        .join(", ");
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (linkUrl, folderNames) => {
          const folderName = prompt(
            `Existing Folders: ${folderNames}\nChoose a Folder:`
          );

          if (folderName) {
            chrome.runtime.sendMessage({ linkUrl, folderName });
          }
        },
        args: [linkUrl, folderNames],
      });
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.linkUrl && message.linkName !== undefined) {
    saveLinkToVault(message.linkUrl, message.linkName);
  } else if (message.linkUrl && message.folderName !== undefined) {
    saveFolderToVault(message.linkUrl, message.folderName);
  }
});
function saveFolderToVault(linkUrl, folderName) {
  if (folderName) {
    chrome.storage.local.get(["Folders"], (result) => {
      let folders = result.Folders || [];
      const alreadyExists = folders.some(
        (folder) => folder.folder_name === folderName
      );
      if (!alreadyExists) {
        let folder = folders.find((f) => f.folder_name === folderName);
        if (!folder) {
          folder = {
            folder_name: folderName,
            links: [],
            folder_icon: "folderbrowse.png",
          };
          folders.unshift(folder);
          folder.links.unshift({ url: linkUrl, url_name: "", tags: "" });
        } else {
          folder.links.unshift({ url: linkUrl, url_name: "", tags: "" });
        }
        chrome.storage.local.set({ Folders: folders }, () => {
          if (!folder) {
            showNotification(
              "Link Saved",
              `New folder added to vault with the link: ${linkUrl}`
            );
          } else {
            showNotification(
              "Link Saved",
              `Your link has been saved to the new folder: ${folderName}`
            );
          }

          // updateBadge();
        });
      } else {
        showNotification(
          "Folder Exists",
          `A folder with the name ${folderName} already exists.`
        );
      }
    });
  } else {
    return;
  }
}

function saveLinkToVault(linkUrl, linkName) {
  chrome.storage.local.get(["Links"], (result) => {
    let links = result.Links || [];
    const alreadyExists = links.some((link) => link.url === linkUrl);
    if (!alreadyExists) {
      links.unshift({ url: linkUrl, url_name: linkName, tags: "" });
      if (linkUrl) {
        chrome.storage.local.set({ Links: links }, () => {
          if (linkName) {
            chrome.runtime.sendMessage({ action: "namedLinkAdded" });
          } else {
            chrome.runtime.sendMessage({ action: "unamedLinkAdded" });
          }
          showNotification("Link Saved", "New link added to your vault.");
        });
      }
    } else {
      showNotification("Link Exists", "This link already exists in your vault");
    }
  });
}

function showNotification(title, message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: title,
    message: message,
    priority: 1,
  });
}

// function updateBadge() {
//   chrome.action.setBadgeText({ text: "•" }); // You can use any string, e.g., '1'
//   chrome.action.setBadgeTextColor({ color: "#FF0000" }); // Red color
// }

// function clearBadge() {
//   chrome.action.setBadgeText({ text: "" });
// }
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "updateLinks") {
//     updateBadge();
//   }
//   if (message.action === "updateFolders") {
//     updateBadge();
//   }
//   if (message.action === "clearBadge") {
//     clearBadge();
//   }
// });

// chrome.action.onClicked.addListener(() => {
//   clearBadge();
// });
