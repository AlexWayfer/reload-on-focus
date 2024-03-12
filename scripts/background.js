const actionOnFocus = async () => {
	const activeTab = (await chrome.tabs.query({ active: true, currentWindow: true }))[0]

	// console.debug('activeTab = ', activeTab)
	// if (activeTab) console.debug('activeTab.url = ', activeTab.url)

	if (!activeTab) return

	const urls = (await chrome.storage.sync.get({ urls: '' })).urls

	urls.split('\n').forEach(url => {
		if (activeTab.url == url) {
			chrome.tabs.reload(activeTab.id)
		}
	})
}

chrome.tabs.onActivated.addListener(async activeInfo => {
	// console.debug('chrome.tabs.onActivated')
	// console.debug('activeInfo = ', activeInfo)

	// const activeTab = await (chrome.tabs.get(activeInfo.tabId))
	// console.debug('activeTab = ', activeTab)
	// console.debug('activeTab.url = ', activeTab.url)

	await actionOnFocus()
})

chrome.windows.onFocusChanged.addListener(async windowId => {
	// console.debug('chrome.windows.onFocusChanged')
	// console.debug('windowId = ', windowId)

	await actionOnFocus()
})
