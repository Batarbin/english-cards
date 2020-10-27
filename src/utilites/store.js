import {createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import welcomeReducer from '../reducers/dictionaryReducer'
import cardGameReducer from '../reducers/cardGameReducer'
import cardsBrowserReducer from '../reducers/cardsBrowserReducer'

const rootReducer = combineReducers({
    welcomeReducer,
    cardGameReducer,
    cardsBrowserReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));