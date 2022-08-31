let url = await browser.tabs.getCurrent().url;
document.getElementById("Example").innerText = url;