const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', e => {
	e.preventDefault()
	messageOne.textContent = 'Loading...'
	messageTwo.textContent = ''
	const location = searchInput.value

	fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location))
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				messageOne.textContent = data.error
				return
			}

			messageOne.textContent = 'Location: ' + data.location
			messageTwo.textContent = 'Forecast: ' + data.forecast
		})
})
