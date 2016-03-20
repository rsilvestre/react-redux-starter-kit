import {
  LOCALE_CHANGE,
  localeChange,
  default as localeReducer
} from 'redux/modules/locale'

describe('(Redux Module) Locale', function() {
  it('Should export a constant LOCALE_CHANGE.', function () {
    expect(LOCALE_CHANGE).to.equal('LOCALE_CHANGE')
  })
  
  describe('(Reducer)', function () {
    it('Should be a function.', function () {
      expect(localeReducer).to.be.a('function')
    })
    
    it('Shoud initialize with a state of "en" (String).', function () {
      expect(localeReducer(undefined, {})).to.equal('en')
    })
    
    it('Should retur the previous state if an action was not matched.', function () {
      let state = localeReducer(undefined, {});
      expect(state).to.equal('en')
      state = localeReducer(state, {type: '@@@@@@@'})
      expect(state).to.equal('en')
      state = localeReducer(state, localeChange('fr'))
      expect(state).to.equal('fr')
      state = localeReducer(state, {type: '@@@@@@@'})
      expect(state).to.equal('fr')
    })
    
    describe('(Action creator) localeChange', function () {
      it('Should be exported as a function.', function () {
        expect(localeChange).to.be.a('function')
      })
      
      it('Should return an action with the type "LOCALE_CHANGE".', function (){
        expect(localeChange()).to.have.property('type', LOCALE_CHANGE)
      })
      
      it('Should assing the first argument to the "payload" property.', function () {
        expect(localeChange('fr')).to.have.property('payload', 'fr')
      })
      
      it('Should default the "payload" property to "en" if not provided.', function () {
        expect(localeChange()).to.have.property('payload', 'en')
      })
    })
    
    describe('(Action Handler) LOCALE_CHANGE', function () {
      it('Should change the state by the action payload\'s "value" property.', function () {
        let state = localeReducer(undefined, {})
        expect(state).to.equal('en')
        state = localeReducer(state, localeChange('fr'))
        expect(state).to.equal('fr')
        state = localeReducer(state, localeChange('es'))
        expect(state).to.equal('es')
        state = localeReducer(state, localeChange('en'))
        expect(state).to.equal('en')
      })
    })
  })
})
