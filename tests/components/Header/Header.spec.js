import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { Header } from 'components/Header/Header'
import { IndexLink, Link } from 'react-router'
import { shallow } from 'enzyme'
import { IntlProvider } from 'react-intl'
import * as messages from 'i18n/'

function renderWithProps (props = {}) {
  const intlData = {
    locale: props.locale,
    messages: messages[props.locale]
  }
  return TestUtils.renderIntoDocument(
    <IntlProvider {...intlData}>
      <Header {...props} />
    </IntlProvider>
  )
}

describe('(Component) Header', () => {
  let _props, _wrapper, _rendered

  beforeEach(() => {
    _props = {
      locale: 'en'
    }
    _wrapper = shallow(<Header/>)
    _rendered = renderWithProps(_props)
  })

  it('Renders a welcome message', () => {
    const h1 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h1')

    expect(h1).to.exist
    expect(h1.textContent).to.match(/Welcome to the React Redux Starter Kit/)
  })

  describe('Navigation links...', () => {

    it('Should render an IndexLink to Home route', () => {
      expect(_wrapper.contains(<IndexLink to='/'/>)).to.equal.true
    })

    it('Should render an Link to Counter route)', () => {
      expect(_wrapper.contains(<Link to='/counter'/>)).to.equal.true
    })

  })
})
