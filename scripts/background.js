const getOptions = async () => {
	return (await chrome.storage.sync.get({ options: {} })).options
}

const getLoadingTabs = async () => {
	return (await chrome.storage.local.get({ loadingTabs: {} })).loadingTabs
}

chrome.runtime.onInstalled.addListener(async _details => {
	const options = await getOptions()
	options.urls ??= ''
	options.threshold ??= 60
	chrome.storage.sync.set({ options })
})

const escapeRegexp = string => {
	return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')
}

const isTabUrlMatching = async (tab, options) => {
	options ??= await getOptions()

	return options.urls.split('\n').some(url => {
		url = url.trim()

		if (url === '') return false

		const regexp = new RegExp(`^${escapeRegexp(url).replace('\\*', '.*')}$`)
		// console.debug('regexp = ', regexp)
		return regexp.test(tab.url)
	})
}

const actionOnFocus = async () => {
	const activeTab = (await chrome.tabs.query({ active: true, currentWindow: true }))[0]

	// console.debug('activeTab = ', activeTab)
	// if (activeTab) console.debug('activeTab.url = ', activeTab.url)

	if (!activeTab) return

	const options = await getOptions()

	if (await isTabUrlMatching(activeTab, options)) {
		const loadingTabs = await getLoadingTabs()

		if (
			(!loadingTabs[activeTab.id]) ||
				(Date.now() > loadingTabs[activeTab.id] + options.threshold * 1000)
		) {
			chrome.tabs.reload(activeTab.id)
		}
	}
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

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
	// console.debug('chrome.tabs.onUpdated')
	// console.debug('changeInfo = ', changeInfo)

	if (changeInfo.status === 'loading') {
		const loadingTabs = await getLoadingTabs()

		if (await isTabUrlMatching(tab)) {
			loadingTabs[tabId] = Date.now()

			chrome.storage.local.set({ loadingTabs })
		} else if (loadingTabs[tabId]) {
			delete loadingTabs[tabId]

			chrome.storage.local.set({ loadingTabs })
		}
	}
})

chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
	// console.debug('chrome.tabs.onRemoved')
	// console.debug('removeInfo = ', removeInfo)

	const loadingTabs = await getLoadingTabs()

	if (loadingTabs[tabId]) {
		delete loadingTabs[tabId]

		chrome.storage.local.set({ loadingTabs })
	}
})
