/* @flow */
import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { localeChange } from '../modules/locale'

type Props = {
  localeChange: Function
}
export class HeaderController extends React.Component<void, Props, void> {
  static propTypes = {
    localeChange: React.PropTypes.func.isRequired
  };

  render () {
    return (
      <Header onLocaleChange={this.props.localeChange}/>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default connect((mapStateToProps), {
  localeChange
})(HeaderController)
