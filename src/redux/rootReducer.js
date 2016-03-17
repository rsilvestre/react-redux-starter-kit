import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import locale from './modules/locale'

export default combineReducers({
  counter,
  router,
  locale
})
