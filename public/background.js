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
    updateLinks(linkUrl, "");
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
    chrome.storage.local.get(["folderNames"], (result) => {
      const foldernames = result.folderNames || [];

      const names = foldernames.map((folder) => folder).join(", ");
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (linkUrl, names) => {
          const nameChoice = prompt(
            `Existing Folders: ${names}\nChoose a Folder:`
          );

          if (nameChoice) {
            chrome.runtime.sendMessage({ linkUrl, nameChoice });
          }
        },
        args: [linkUrl, foldernames],
      });
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.linkUrl && message.linkName !== undefined) {
    updateLinks(message.linkUrl, message.linkName);
  } else if (message.linkUrl && message.folderName !== undefined) {
    updateFolders(message.linkUrl, message.folderName);
  } else if (message.linkUrl && message.nameChoice !== undefined) {
    appendLink(message.linkUrl, message.nameChoice);
  }
});

async function updateLinks(linkUrl, linkName) {
  chrome.storage.local.get(["session"], async (result) => {
    const sessionid = result.session.user.id;
    if (!sessionid) {
      console.error("No session ID");
      return;
    }
    const link = {
      url: linkUrl,
      url_name: linkName,
      tags: "",
    };
    console.log("sessionid", sessionid);
    const requestBody = {
      id: sessionid,
      links: link,
    };
    console.log("requestBody", requestBody);
    try {
      const response = await fetch(
        "http://localhost:3000/api/contextmenu/updateLinks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Extension-ID": "bbgippochabbclmbgkkbbofljdfnbdop",
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );
      console.log("response", response);
      const data = await response.json();
      showNotification("Link Saved", `Your link has been saved to vault`);
      console.log("data from background", data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // const data = await response.json();

      if (linkName) {
        chrome.runtime.sendMessage({ action: "namedLinkAdded" });
      } else {
        chrome.runtime.sendMessage({ action: "updateLinks" });
      }
      if (data.error) {
        console.error("Error updating links:", data.error);
      } else {
        console.log("Links updated successfully: from background", data);
      }
    } catch (error) {
      console.error("Error making API request:", error);
    }
  });
}

async function updateFolders(linkUrl, folderName) {
  chrome.storage.local.get(["session"], async (result) => {
    const sessionid = result.session.user.id;
    if (!sessionid) {
      console.error("No session ID");
      return;
    }
    const folder = {
      folder_name: folderName,
      links: [{ url: linkUrl, url_name: "", tags: "" }],
      folder_icon: "folderbrowse.png",
    };
    const requestBody = {
      id: sessionid,
      folder: folder,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/contextmenu/updateFolders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Extension-ID": "bbgippochabbclmbgkkbbofljdfnbdop",
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();
      console.log("data from background", data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      chrome.runtime.sendMessage({ action: "updateFolders" });
      showNotification(
        "Link Saved",
        `New folder added to vault with the link: ${linkUrl}`
      );
      if (data.error) {
        console.error("Error updating folders:", data.error);
      } else {
        console.log("Folders updated successfully:", data);
      }
    } catch (error) {
      console.error("Error making API request:", error);
    }
  });
}

async function appendLink(linkUrl, folderName) {
  chrome.storage.local.get(["session"], async (result) => {
    const sessionid = result.sessionid.user.id;
    if (!sessionid) {
      console.error("No session ID");
      return;
    }
    const folder = {
      folder_name: folderName,
      link: { url: linkUrl, url_name: "", tags: "" },
      folder_icon: "folderbrowse.png",
    };
    const requestBody = {
      id: sessionid,
      folder: folder,
    };
    console.log("requestBody", requestBody);
    try {
      const response = await fetch(
        "http://localhost:3000/api/contextmenu/appendLink",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Extension-ID": "bbgippochabbclmbgkkbbofljdfnbdop",
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();
      console.log("data from background", data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      chrome.runtime.sendMessage({ action: "updateFolders" });
      showNotification(
        "Link Saved",
        `Your link has been saved to the new folder: ${folderName}`
      );
      if (data.error) {
        console.error("Error updating folders:", data.error);
      } else {
        console.log("Folders updated successfully:", data);
      }
    } catch (error) {
      console.error("Error making API request:", error);
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
