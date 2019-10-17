const request = require('request')

const geocode = (address, callback) => {
	const accessToken = process.env.MAPBOX_ACCESS_TOKEN
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=' +
		accessToken +
		'&limit=1'

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services!', undefined)
			return
		}

		if (body.features.length === 0) {
			callback('Unable to find location. Try another search', undefined)
			return
		}
		const { center, place_name: location } = body.features[0]
		const [longitude, latitude] = center
		callback(undefined, {
			longitude,
			latitude,
			location
		})
	})
}

module.exports = geocode
