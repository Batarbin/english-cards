import {
    WordType,
    ResultsType,
    WordDispatchTypes,
    WORD_LOADING,
    WORD_SUCCESS,
    WORD_FAIL,
    WORD_NULL,
    DICTIONARY_PAGINATION_GET_CURRENT_PAGE
} from "../types/dictionaryTypes";
  
interface DefaultStateI {
    // dictionary
    dictionaryLoading: boolean
    dictionaryLoaded: boolean
    isNull: boolean
    wordInfo?: WordType
    // pagination
    currentPage: number
    currentResults?: ResultsType[]
    pageNumbers: number[]
}
const defaultState: DefaultStateI = {
    // dictionary
    dictionaryLoading: false,
    dictionaryLoaded: true,
    isNull: false,
    // pagination
    currentPage: 1,
    pageNumbers: []
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
            const currentResultsArr = action.payload.results.slice(0, 3)
            const pageNumbers = []
            for (let i = 1; i <= Math.ceil(action.payload.results.length / 3); i++) {
                pageNumbers.push(i)
            }
            return {
                ...state,
                dictionaryLoading: false,
                dictionaryLoaded: true,
                isNull: false,
                wordInfo: action.payload,
                // pagination
                currentPage: 1,
                currentResults: currentResultsArr,
                pageNumbers
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
        case DICTIONARY_PAGINATION_GET_CURRENT_PAGE: 
            return {
                ...state,
                currentResults: action.array,
                currentPage: action.page
            }
        default:
            return state
    }
}
  
export default dictionaryReducer