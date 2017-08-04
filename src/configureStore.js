import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  //devToolsExtension
  //return createStore(rootReducer, preloadedState, compose(applyMiddleware(thunkMiddleware,loggerMiddleware), window.devToolsExtension()))
  
  //NO devToolsExtension
  return createStore(rootReducer, preloadedState, applyMiddleware(thunkMiddleware,loggerMiddleware))

}