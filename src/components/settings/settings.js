import React, {Component} from 'react'
import styles from './settings.css'
import Input from '../input'
import Button from '../button'

class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = props.value
  }
  render () {
    const {onSave} = this.props
    const {location} = this.state
    return (
      <div className={styles.settings}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.text}>To make sure your dashboard experience works best please make sure you enter the details below. We do not store any of this data. </p>
        <Input label='Your location?' value={location} onChange={(e) => this.setState({location: e.target.value})} />
        <Button onClick={() => onSave(this.state)}>SAVE</Button>
      </div>
    )
  }
}

Settings.defaultProps = {
  value: {},
  onSave: () => null
}

export default Settings
