import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { bindActionCreators } from 'redux'
import { Counter } from 'components/Counter/Counter'
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
      <Counter {...props} />
    </IntlProvider>
  )
}

describe('(Component) Counter', () => {
  let _props, _spies, _wrapper, _rendered

  beforeEach(() => {
    _spies = {}
    _props = {
      counter: 5,
      locale: 'en',
      ...bindActionCreators({
        doubleAsync: (_spies.doubleAsync = sinon.spy()),
        increment: (_spies.increment = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Counter {..._props} />)
    _rendered = renderWithProps(_props)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should render with an <h2> that includes Sample Counter text.', () => {
    const h2 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h2')

    expect(h2).to.exist
    expect(h2.textContent).to.match(/Sample Counter: 5/)
  })

  it('Should render props.counter at the end of the sample counter <h2>.', () => {
    expect(_wrapper.find('h2').text()).to.match(/5$/)
    _wrapper.setProps({ counter: 8 })
    expect(_wrapper.find('h2').text()).to.match(/8$/)
  })

  it('Should render exactly two buttons.', () => {
    expect(_wrapper).to.have.descendants('.btn')
  })
  //
  describe('An increment button...', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('button').filterWhere(a => a.text() === 'Increment')
    })

    it('has bootstrap classes', () => {
      expect(_button.hasClass('btn btn-default')).to.be.true
    })

    it('Should dispatch a `increment` action when clicked', () => {
      _spies.dispatch.should.have.not.been.called

      _button.simulate('click')

      _spies.dispatch.should.have.been.called
      _spies.increment.should.have.been.called
    });
  })

  describe('A Double (Async) button...', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('button').filterWhere(a => a.text() === 'Double (Async)')
    })

    it('has bootstrap classes', () => {
      expect(_button.hasClass('btn btn-default')).to.be.true
    })

    it('Should dispatch a `doubleAsync` action when clicked', () => {
      _spies.dispatch.should.have.not.been.called

      _button.simulate('click')

      _spies.dispatch.should.have.been.called
      _spies.doubleAsync.should.have.been.called
    });
  })
})
