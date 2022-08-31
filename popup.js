browser.tabs.getCurrent().then(function(tab) {
    document.getElementById("Example").innerText = tab.title;
})