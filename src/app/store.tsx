import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {combineReducers} from 'redux'
import dictionaryReducer from '../reducers/dictionaryReducers'
import cardGameReducer from '../reducers/cardGameReducers'
import cardCollectionReducer from '../reducers/cardCollectionReducers'
import searchInputReducer from '../reducers/searchInputReducers'

const RootReducer = combineReducers({
    dictionaryState: dictionaryReducer,
    cardGameState: cardGameReducer,
    cardCollectionState: cardCollectionReducer,
    searchInputState: searchInputReducer
});

export type RootStore = ReturnType<typeof RootReducer>

export const Store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));