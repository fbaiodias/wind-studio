import React from 'react'
import ReactDOM from 'react-dom'
import App from '../../../src/components/settings'

function saveOptions (value) {
  chrome.storage.sync.set(value, () => {
    window.close()
  })
}

chrome.storage.sync.get((value) => {
  ReactDOM.render(
    <App value={value} onSave={saveOptions} />,
    document.querySelector('#root')
  )
})
