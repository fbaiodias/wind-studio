import React, {Component} from 'react'
import $ from './dashboard.css'
import Day from '../day'
import getWeather from './weather'

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      weather: {}
    }

    getWeather(props.location, (err, weather) => {
      console.log(weather)
      this.setState({weather})
    })
  }
  render () {
    const {weather: {forecast = {}, location} = {}} = this.state
    return (
      <div className={$.dashboard}>
        <div className={$.opacity}>
          <div className={$.daysWrapper}>
            {Object.keys(forecast)
              .map(dayOfTheWeek => (
                <Day
                  key={dayOfTheWeek}
                  location={location}
                  forecast={forecast[dayOfTheWeek]}
                  totalDays={Object.keys(forecast).length}
                />
              ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
