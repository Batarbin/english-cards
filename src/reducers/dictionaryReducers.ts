import {
    WordType,
    WordDispatchTypes,
    WORD_SUCCESS,
    WORD_FAIL,
    WORD_NULL
} from "../types/dictionaryTypes";
  
interface DefaultStateI {
    dictionaryLoaded: boolean,
    isNull: boolean,
    wordInfo?: WordType
}
const defaultState: DefaultStateI = {
    dictionaryLoaded: false,
    isNull: true
}
  
const dictionaryReducer = (state: DefaultStateI = defaultState, action: WordDispatchTypes) : DefaultStateI => {
    switch (action.type) {
        case WORD_SUCCESS:
            return {
                ...state,
                dictionaryLoaded: true,
                isNull: false,
                wordInfo: action.payload
            }
        case WORD_FAIL:
            return {
                ...state,
                dictionaryLoaded: false,
                isNull: false
            }
        case WORD_NULL:
            return {
                ...state,
                dictionaryLoaded: false,
                isNull: true
            }
        default:
            return state
    }
}
  
export default dictionaryReducer