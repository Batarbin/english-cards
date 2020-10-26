import { combineReducers } from 'redux'
import welcomeReducer from './welcome'
import cardGameReducer from './card-game'
import cardsBrowserReducer from './cards-browser'

export default combineReducers({
    welcomeReducer,
    cardGameReducer,
    cardsBrowserReducer
})