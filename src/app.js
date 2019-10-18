require('dotenv').config()
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Andrew Mead'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Andrew Mead'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		helpText: 'This is some helpful text',
		name: 'Andrew Mead'
	})
})

app.get('/weather', (req, res) => {
	const { address } = req.query

	if (!address) {
		return res.send({
			error: 'You must provide an address'
		})
	}

	geocode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error })
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error })
			}

			return res.send({
				location,
				forecast: forecastData,
				address
			})
		})
	})
})

app.get('/products', (req, res) => {
	const { search, rating } = req.query

	if (!search) {
		return res.send({
			error: 'You must provide a search term'
		})
	}

	console.log(req.query)
	res.send({
		products: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Help',
		errorMessage: 'Help article not found',
		name: 'Parinya Samrongsap'
	})
})

// match everything that not match above routes
app.get('*', (req, res) => {
	res.render('404', {
		title: '404 Not found',
		errorMessage: 'Page not found.',
		name: 'Parinya Samrongsap'
	})
})

app.listen(port, () => {
	console.log(`Server is up on port ${port}`)
})
