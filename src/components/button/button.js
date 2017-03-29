import React, {Component} from 'react'
import styles from './button.css'

class Button extends Component {
  render () {
    return (
      <button className={styles.button} {...this.props} />
    )
  }
}

export default Button
