const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4452d538b252f783512afb2c8a8f95d5&query=' + latitude + "," + longitude + '&units=f'
    
    request({url, json: true}, (error, {body}) => {
           if(error){
                callback('Unable to connect to weather service', undefined)
            } else if(body.error) {
                callback('Unable to find location', undefined)
            }
            else{
                
   
                callback(undefined, body.current.weather_descriptions[0]+ '. Temp is ' + body.current.temperature + ' degrees Fahrenheit, feels like ' + body.current.feelslike + " tho. " + 'Wind speed is ' + body.current.wind_speed + ' mph so hide yo kids')
            }
    })
}

module.exports = forecast