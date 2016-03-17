import React, {Component, PropTypes} from 'react'
import {defineMessages, injectIntl, intlShape} from 'react-intl'
const messages = defineMessages({
  spanish: {
    id: 'languageSelector.spanish',
    description: 'Select language',
    defaultMessage: 'Spanish'
  },
  english: {
    id: 'languageSelector.english',
    description: 'Select language',
    defaultMessage: 'English'
  },
  french: {
    id: 'languageSelector.french',
    description: 'Select language',
    defaultMessage: 'French'
  }
})

class LanguageSelector extends Component {
  constructor () {
    super()
    this._handleChange = this._handleChange.bind(this)
  }

  _handleChange (e) {
    this.props.onChange(e.target.value)
  }

  render () {
    const {formatMessage, locale} = this.props.intl
    return (
      <select value={locale} onChange={this._handleChange}>
        <option id='es' value='es'>{formatMessage(messages.spanish)}</option>
        <option id='fr' value='fr'>{formatMessage(messages.french)}</option>
        <option id='en' value='en'>{formatMessage(messages.english)}</option>
      </select>
    )
  }
}

LanguageSelector.propTypes = {
  intl: intlShape.isRequired,
  onChange: PropTypes.func.isRequired
}
export default injectIntl(LanguageSelector)
