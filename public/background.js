chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.tabs.create(
      {
        url: "https://linkvaultapp.netlify.app/",
      },
      (tab) => {
        if (chrome.runtime.lastError) {
          console.error(`Error opening the onboarding page: ${chrome.runtime.lastError.message}`);
        } else {
          console.log(`Onboarding page opened in tab: ${tab.id}`);
        }
      }
    );
  }
});

// Listener for action button click
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return; // Ensure tab.id is valid
  try {
    const { enabled } = await chrome.sidePanel.getOptions({ tabId: tab.id });
    await chrome.sidePanel.setOptions({
      tabId: tab.id,
      path: 'index.html',
      enabled: !enabled,
    });
  } catch (error) {
    console.error('Error toggling side panel:', error);
  }
});

// Listener for messages to close the side panel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'closePanel' && sender.tab && sender.tab.id) {
    chrome.sidePanel.setOptions({
      tabId: sender.tab.id,
      enabled: false,
    }).catch((error) => console.error('Error closing side panel:', error));
  }
});

