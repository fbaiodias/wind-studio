import React from 'react'
import moment from 'moment'
import classnames from 'classnames'
import convert from 'convert-units'
import $ from './day.css'

const MAX_SPEED = 20
const calculateBarHeight = speed => 400 * speed / MAX_SPEED

const Bar = ({location, windSpeed, windDirection, from}) => (
  <div className={$.barWrapper}>
    <div className={$.bar} style={{height: calculateBarHeight(windSpeed.mps)}} />
    <div className={$.popup}>
      <div className={$.title}>{location} - {moment(from).format('ha')}</div>
      <div>
        <div className={$.col}>
          <h3>Wind</h3>
          <div>
            {windSpeed.mps}
            <span className={$.units}>m/s</span>
          </div>
          <div>
            {convert(windSpeed.mps).from('m/s').to('km/h').toFixed(1)}
            <span className={$.units}>km/h</span>
          </div>
        </div>
        <div className={$.col}>
          <h3>Direction</h3>
          <div>{windDirection.code}</div>
        </div>
      </div>
    </div>
  </div>
)

const Day = (props) => {
  const {
    forecast,
    location
  } = props

  const date = moment(forecast[0].from)

  const className = classnames($.root, {
    [$.isToday]: moment(date).isSame(moment(), 'day')
  })

  return (
    <div className={className}>
      <div className={$.dayOfTheWeek}>
        {date.format('ddd')}
      </div>
      <div className={$.date}>
        {date.format('DD MMM')}
      </div>

      <div className={$.wrapper}>
        {forecast.map(f => <Bar key={f.from} {...f} location={location} />)}
      </div>
    </div>
  )
}

export default Day
