/* @flow */
import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import classes from './Counter.scss'

const messages = defineMessages({
  sampleCounter: {
    id: 'home.sampleCounter',
    description: 'Sample Counter text',
    defaultMessage: 'Sample Counter:'
  }
})

// FlowType annotations
type Props = {
  counter: number,
  doubleAsync: Function,
  increment: Function
}

export const Counter = (props: Props) => (
  <div>
    <h2 className={classes.counterContainer}>
      <FormattedMessage {...messages.sampleCounter} />
      {' '}
      <span className={classes['counter--green']}>
        {props.counter}
      </span>
    </h2>
    <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.doubleAsync}>
      Double (Async)
    </button>
  </div>
)

Counter.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}

export default Counter
