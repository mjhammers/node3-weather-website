const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Miguel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOOT',
        name: 'jk its actually Mike'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HALP',
        helpMessage: 'Just figure out you twat',
        name: 'Miguel'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must enter an address'
        })}

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        
    
        forecast(latitude, longitude, (error, forecastData) => {
            console.log('got here')
            if(error){
                return res.send({error})
            }
            
            res.send({
                forecast: forecastData,
                
                address: req.query.address
            })
          })
    })
    
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Oops',
        message: 'Help article not found',
        name: 'Miguel'
    })
})

// 404 error page
app.get('*', (req, res) => {
    res.render('404',{
        title: 'Oops',
        message: 'Page not found',
        name: 'Miguel'
    })
})



app.listen(3000, () => {
    console.log('server running on port 3000')
})