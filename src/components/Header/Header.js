import React from 'react'
import { IndexLink, Link } from 'react-router'
import { defineMessages, FormattedMessage } from 'react-intl'
import classes from './Header.scss'
import LanguageSelector from '../LanguageSelector'

const messages = defineMessages({
  welcome: {
    id: 'home.welcome',
    description: 'Welcome to the homepage',
    defaultMessage: 'Welcome to the React Redux Starter Kit'
  }
})

export const Header = ({ onLocaleChange }) => (
  <div>
    <LanguageSelector onChange={onLocaleChange} >prueba Idioma Selector</LanguageSelector>
    <h1><FormattedMessage {...messages.welcome} /></h1>
    <IndexLink to='/' activeClassName={classes.activeRoute}>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName={classes.activeRoute}>
      Counter
    </Link>
  </div>
)

Header.propTypes = {
  onLocaleChange: React.PropTypes.func.isRequired
}

export default Header
