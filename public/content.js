function promptForLinkName(linkUrl) {
  const linkName = prompt("Enter a name for the link:");
  chrome.runtime.sendMessage({ linkUrl, linkName });
}
