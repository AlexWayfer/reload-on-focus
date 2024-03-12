document.addEventListener('DOMContentLoaded', async _event => {
	document.forms.options.urls.value = (await chrome.storage.sync.get('urls')).urls

	document.forms.options.addEventListener('submit', event => {
		event.preventDefault()

		// console.debug('event.target.urls.value = ', event.target.urls.value)

		if (!event.target.urls.value.endsWith('\n')) event.target.urls.value += '\n'

		chrome.storage.sync.set({ urls: event.target.urls.value })
	})

	document.forms.options.urls.addEventListener('keydown', event => {
		// console.debug('event.key = ', event.key)
		// console.debug('event.ctrlKey = ', event.ctrlKey)
		if (event.ctrlKey && event.key === 'Enter') {
			event.target.form.requestSubmit()
		}
	})
})
