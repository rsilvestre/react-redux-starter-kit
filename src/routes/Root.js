import React from 'react'
import { connect, Provider } from 'react-redux'
import { Router } from 'react-router'
import { IntlProvider } from 'react-intl'
import * as messages from '../i18n/'

class Root extends React.Component {
  static propTypes = {
    locale: React.PropTypes.string.isRequired,
    history: React.PropTypes.object.isRequired,
    routes: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired
  }

  get content () {
    const intlData = {
      locale: this.props.locale,
      messages: messages[this.props.locale]
    }
    return (
      <IntlProvider {...intlData}>
        <div>
          <Router history={this.props.history} key={Math.random()}>
            {this.props.routes}
          </Router>
        </div>
      </IntlProvider>
    )
  }

  get devTools () {
    // Use Redux DevTools chrome extension
    if (__DEBUG__) {
      if (!window.devToolsExtension) window.devToolsExtension.open()
    }
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          {this.content}
          {this.devTools}
        </div>
      </Provider>
    )
  }
}

function mapStateToProps (state) {
  return { locale: state.locale }
}
export default connect(mapStateToProps)(Root)
