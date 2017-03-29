import React from 'react'
import ReactDOM from 'react-dom'
import App from '../../../src'

chrome.storage.sync.get((value) => {
  const {name, birthdate, salary, location} = value

  ReactDOM.render(
    <App
      name={name}
      birthdate={birthdate}
      salary={salary}
      location={location}
    />,
    document.querySelector('#root')
  )
})
