document.addEventListener('DOMContentLoaded', async _event => {
	const options = (await chrome.storage.sync.get('options')).options
	const optionsForm = document.forms.options

	optionsForm.urls.value = options.urls
	optionsForm.threshold.value = options.threshold

	optionsForm.addEventListener('submit', async event => {
		event.preventDefault()

		// console.debug('event.target.urls.value = ', event.target.urls.value)

		if (!optionsForm.urls.value.endsWith('\n')) optionsForm.urls.value += '\n'

		const options = (await chrome.storage.sync.get('options')).options
		options.urls = optionsForm.urls.value
		options.threshold = optionsForm.threshold.value

		chrome.storage.sync.set({ options })
	})

	Array(optionsForm.urls, optionsForm.threshold).forEach(inputElement => {
		inputElement.addEventListener('keydown', event => {
			// console.debug('event.key = ', event.key)
			// console.debug('event.code = ', event.code)
			// console.debug('event.ctrlKey = ', event.ctrlKey)
			if (event.ctrlKey && event.code === 'Enter') {
				optionsForm.requestSubmit()
			}
		})
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
