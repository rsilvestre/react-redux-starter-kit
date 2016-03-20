import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { bindActionCreators } from 'redux'
import { HomeView } from 'views/HomeView/HomeView'
import { mount } from 'enzyme'
import { IntlProvider } from 'react-intl'
import * as messages from 'i18n/'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function renderWithProps (props = {}) {
  const intlData = {
    locale: props.locale,
    messages: messages[props.locale]
  }
  return TestUtils.renderIntoDocument(
    <IntlProvider {...intlData}>
      <HomeView {...props} />
    </IntlProvider>
  )
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<HomeView {...props} />)
}

describe('(View) Home', function () {
  let _component, _rendered, _props, _spies

  beforeEach(function () {
    _spies = {}
    _props = {
      counter: 0,
      locale: 'en',
      ...bindActionCreators({
        doubleAsync: (_spies.doubleAsync = sinon.spy()),
        increment: (_spies.increment = sinon.spy()),
        localeChange: (_spies.localeChange = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }

    _component = shallowRenderWithProps(_props)
    _rendered = renderWithProps(_props)
  })

  it('Should render as a <div>.', function () {
    expect(_component.type).to.equal('div')
  })

  it('Should include an <h1> with welcome text.', function () {
    const h1 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h1')

    expect(h1).to.exist
    expect(h1.textContent).to.match(/Welcome to the React Redux Starter Kit/)
  })

  it('Should render with an <h2> that includes Sample Counter text.', function () {
    const h2 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h2')

    expect(h2).to.exist
    expect(h2.textContent).to.match(/Sample Counter/)
  })

  it('Should render props.counter at the end of the sample counter <h2>.', function () {
    const h2 = TestUtils.findRenderedDOMComponentWithTag(
      renderWithProps({ ..._props, counter: 5 }), 'h2'
    )

    expect(h2).to.exist
    expect(h2.textContent).to.match(/5$/)
  })

  it('Should render exactly two buttons.', function () {
    const intlData = {
      locale: _props.locale,
      messages: messages[_props.locale]
    }
    const wrapper = mount(
      <IntlProvider {...intlData}>
        <HomeView {..._props} />
      </IntlProvider>
    )

    expect(wrapper).to.have.descendants('.btn')
  })

  describe('An increment button...', function () {
    let _btn

    beforeEach(() => {
      _btn = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'button')
        .filter(a => /Increment/.test(a.textContent))[0]
    })

    it('should be rendered.', function () {
      expect(_btn).to.exist
    })

    it('should dispatch an action when clicked.', function () {
      _spies.dispatch.should.have.not.been.called
      TestUtils.Simulate.click(_btn)
      _spies.dispatch.should.have.been.called
    })
  })

  describe('A Double (Async) button...', function () {
    let _btn

    beforeEach(() => {
      _btn = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'button')
        .filter(a => /Double/.test(a.textContent))[0]
    })

    it('should be rendered.', function () {
      expect(_btn).to.exist
    })

    it('should dispatch an action when clicked.', function () {
      _spies.dispatch.should.have.not.been.called
      TestUtils.Simulate.click(_btn)
      _spies.dispatch.should.have.been.called
    })
  })

  describe('Change language to french.', function () {
    let _select

    beforeEach(() => {
      _select = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'select')
    })

    it('should be rendered.', function () {
      expect(_select).to.exist
    })

    it('should dispatch an action when selected.', function () {
      _spies.dispatch.should.have.not.been.called
      TestUtils.Simulate.change(_select[0], { target: { value: 'fr' } })
      _spies.dispatch.should.have.been.called
    })
  })
})
