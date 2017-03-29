import React, {Component} from 'react'
import $ from './dashboard.css'
import Day from '../day'
import getWeather from './weather'

class Dashboard extends Component {
  constructor (props) {
    super(props)

    getWeather(props.location, (err, weather) => {
      console.log(weather)
      this.setState({weather})
    })
  }
  render () {
    const {name, birthdate, salary, location} = this.props
    return (
      <div className={$.dashboard}>
        <div className={$.opacity}>
          <div className={$.daysWrapper}>
            <Day />
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
