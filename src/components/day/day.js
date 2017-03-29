import React from 'react'
import moment from 'moment'
import $ from './day.css'

const Bar = () => <div className={$.barWrapper}><div className={$.bar} /></div>

const Day = (props) => {
  const {
    date = new Date()
  } = props

  return (
    <div className={$.root}>
      <div className={$.dayOfTheWeek}>
        {moment(date).format('ddd')}
      </div>
      <div className={$.date}>
        {moment(date).format('MMM YY')}
      </div>

      <div className={$.wrapper}>
        <Bar />
        <Bar />
        <Bar />
        <Bar />
        <Bar />
        <Bar />
      </div>

    </div>
  )
}

export default Day
