import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {combineReducers} from 'redux'
import dictionaryReducer from '../reducers/dictionaryReducers'
import cardGameReducer from '../reducers/cardGameReducers'
import cardCollectionReducer from '../reducers/cardCollectionReducers'

const RootReducer = combineReducers({
    wordInfoState: dictionaryReducer,
    cardGameState: cardGameReducer,
    cardCollectionState: cardCollectionReducer
});

export type RootStore = ReturnType<typeof RootReducer>

export const Store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));