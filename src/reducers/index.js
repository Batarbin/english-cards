import { combineReducers } from 'redux'
import welcomeReducer from './welcomeReducer'
import cardGameReducer from './cardGameReducer'
import cardsBrowserReducer from './cardsBrowserReducer'

export default combineReducers({
    welcomeReducer,
    cardGameReducer,
    cardsBrowserReducer
})