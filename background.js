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

/* Enables or disables mode. */
function toggleMode() {
    enabled = !enabled;
    if (enabled) {
        chrome.browserAction.setIcon({
            path: "enabled.png"
        });
    } else {
        chrome.browserAction.setIcon({
            path: "disabled.png"
        });
    }
}
