document.addEventListener('DOMContentLoaded', async _event => {
	const optionsForm = document.forms.options

	optionsForm.urls.value = (await chrome.storage.sync.get({ urls: '' })).urls

	optionsForm.addEventListener('submit', event => {
		event.preventDefault()

		// console.debug('event.target.urls.value = ', event.target.urls.value)

		if (!event.target.urls.value.endsWith('\n')) event.target.urls.value += '\n'

		chrome.storage.sync.set({ urls: event.target.urls.value })
	})

	optionsForm.urls.addEventListener('keydown', event => {
		// console.debug('event.key = ', event.key)
		// console.debug('event.code = ', event.code)
		// console.debug('event.ctrlKey = ', event.ctrlKey)
		if (event.ctrlKey && event.code === 'Enter') {
			event.target.form.requestSubmit()
		}
	})

	document.addEventListener('keydown', event => {
		// console.debug('event.key = ', event.key)
		// console.debug('event.code = ', event.code)
		// console.debug('event.ctrlKey = ', event.ctrlKey)
		if (event.ctrlKey && event.code === 'KeyS') {
			event.preventDefault()

			optionsForm.requestSubmit()
		}
	})
})
