import {
    WordType,
    WordDispatchTypes,
    WORD_LOADING,
    WORD_SUCCESS,
    WORD_FAIL,
    WORD_NULL
} from "../types/dictionaryTypes";
  
interface DefaultStateI {
    dictionaryLoading: boolean
    dictionaryLoaded: boolean
    isNull: boolean
    wordInfo?: WordType
}
const defaultState: DefaultStateI = {
    dictionaryLoading: false,
    dictionaryLoaded: true,
    isNull: false
}
  
const dictionaryReducer = (state: DefaultStateI = defaultState, action: WordDispatchTypes) : DefaultStateI => {
    switch (action.type) {
        case WORD_LOADING: 
            return {
                ...state,
                dictionaryLoading: true,
                isNull: false
            }
        case WORD_SUCCESS:
            return {
                ...state,
                dictionaryLoading: false,
                dictionaryLoaded: true,
                wordInfo: action.payload,
                isNull: false
            }
        case WORD_FAIL:
            return {
                ...state,
                dictionaryLoading: false,
                dictionaryLoaded: false,
                isNull: false
            }
        case WORD_NULL:
            return {
                ...state,
                isNull: true
            }
        default:
            return state
    }
}
  
export default dictionaryReducer