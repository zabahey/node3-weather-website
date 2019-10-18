const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const apiKey = process.env.DARKSKY_API_KEY
	const url = 'https://api.darksky.net/forecast/' + apiKey + '/' + latitude + ',' + longitude
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined)
			return
		}
		if (body.error) {
			callback('Unable to find location', undefined)
			return
		}

		const currently = body.currently
		const todayForecast = body.daily.data[0]
		console.log(todayForecast)
		callback(
			undefined,
			todayForecast.summary +
				' It is currently ' +
				currently.temperature +
				' degrees out. There is a ' +
				currently.precipProbability +
				'% change of rain.' +
				'\nMinimum temperature: ' +
				todayForecast.temperatureMin +
				'\nMaximum temperature: ' +
				todayForecast.temperatureMax
		)
	})
}

module.exports = forecast
