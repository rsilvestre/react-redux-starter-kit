import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import locale from './modules/locale'

export const reducers = (asyncReducers) => {
  return combineReducers({ router, locale, ...asyncReducers })
}

export const injectReducer = ({ store, key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(reducers(store.asyncReducers))
}

export default reducers
