var enabled = false;

/* Gets a command such as keyboard combinations. */
chrome.commands.onCommand.addListener(function(command) {
    if (command == "toggleMode") {
        toggleMode();
    }
});

/* Gets called when the extension icon is clicked. */
chrome.browserAction.onClicked.addListener(function(tab) {
    toggleMode();
});

/* Enables or disables the mode. */
function toggleMode() {
    enabled = !enabled;
    if (enabled) {
        chrome.browserAction.setIcon({
            path: "icons/enabled.png"
        });
    } else {
        chrome.browserAction.setIcon({
            path: "icons/disabled.png"
        });
    }
}

/* Listens to messages from content scripts. */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == "enabled") {
        sendResponse({enabled: enabled});
    }
});