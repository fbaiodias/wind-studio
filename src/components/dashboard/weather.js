import request from 'request'
import {parseString} from 'xml2js'

const getWeather = (location, cb) => {
  console.log('getWeather', location)
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&mode=xml&appid=${process.env.OPENWEATHERMAP_KEY}`

  request(url, (err, res, body) => {
    if (err) {
      cb(err)
    }

    parseString(body, (err, result) => {
      cb(err, mapResult(result.weatherdata))
    })
  })
}

const mapResult = (weatherdata) => ({
  sunrise: weatherdata.sun[0].$.rise,
  sunset: weatherdata.sun[0].$.rise,
  forecast: weatherdata.forecast[0].time.map(f => ({
    from: f.$.from,
    to: f.$.to,
    clouds: f.clouds[0].$,
    humidity: f.humidity[0].$,
    precipitation: f.precipitation[0].$,
    pressure: f.pressure[0].$,
    symbol: f.symbol[0].$,
    temperature: f.temperature[0].$,
    windDirection: f.windDirection[0].$,
    windSpeed: f.windSpeed[0].$,
  }))
})

export default getWeather
