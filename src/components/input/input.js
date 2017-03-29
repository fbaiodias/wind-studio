import React, {Component} from 'react'
import styles from './input.css'

class Input extends Component {
  render () {
    const {label, ...rest} = this.props
    return (
      <div className={styles.item}>
        <label className={styles.label}>{label}</label>
        <input type='text' className={styles.input} {...rest} />
      </div>
    )
  }
}

export default Input
