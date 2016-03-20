/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { increment, doubleAsync } from '../../redux/modules/counter'
import DuckImage from './Duck.jpg'
import classes from './HomeView.scss'
import { localeChange } from '../../redux/modules/locale'
import { defineMessages, FormattedMessage } from 'react-intl'
import LanguageSelector from 'components/LanguageSelector'

const messages = defineMessages({
  welcome: {
    id: 'home.welcome',
    description: 'Welcome to the homepage',
    defaultMessage: 'Welcome to the React Redux Starter Kit'
  },
  sampleCounter: {
    id: 'home.sampleCounter',
    description: 'Sample Counter text',
    defaultMessage: 'Sample Counter: '
  },
  spanish: {
    id: 'home.spanish',
    description: 'Select language',
    defaultMessage: 'Spanish'
  },
  english: {
    id: 'home.english',
    description: 'Select language',
    defaultMessage: 'English'
  },
  french: {
    id: 'home.french',
    description: 'Select language',
    defaultMessage: 'French'
  }
})

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type Props = {
  counter: number,
  doubleAsync: Function,
  increment: Function,
  localeChange: Function
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component<void, Props, void> {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired,
    localeChange: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='container text-center'>
        <LanguageSelector onChange={this.props.localeChange}>prueba Idioma Selector</LanguageSelector>

        <div className='row'>
          <div className='col-xs-2 col-xs-offset-5'>
            <img className={classes.duck}
              src={DuckImage}
              alt='This is a duck, because Redux.' />
          </div>
        </div>
        <h1><FormattedMessage {...messages.welcome} /></h1>
        <h2>
          <FormattedMessage {...messages.sampleCounter} />
          <span className={classes['counter--green']}>{this.props.counter}</span>
        </h2>
        <button className='btn btn-default' onClick={this.props.increment}>
          Increment
        </button>
        {' '}
        <button className='btn btn-default' onClick={this.props.doubleAsync}>
          Double (Async)
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter,
  locale: state.locale
})

export default connect((mapStateToProps), {
  increment: () => increment(1),
  doubleAsync,
  localeChange
})(HomeView)
