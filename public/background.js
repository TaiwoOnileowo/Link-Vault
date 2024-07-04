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
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.sidePanel.setOptions({
        tabId: tab.id,
        path: 'index.html',
        enabled: true,
      });
    });
  });

  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));
});
