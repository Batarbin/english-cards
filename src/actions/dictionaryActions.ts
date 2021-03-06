import { Dispatch } from 'redux'
import { WordDispatchTypes, WORD_LOADING, WORD_SUCCESS, WORD_FAIL, WORD_NULL, 
         DICTIONARY_PAGINATION_GET_CURRENT_PAGE, ResultsType } from '../types/dictionaryTypes'

export const GetWordInfo = (wordToInfo: string) => async (dispatch: Dispatch<WordDispatchTypes>) => {
    if (wordToInfo.length) {
        dispatch({ type: WORD_LOADING })
        try {
            await fetch(`https://rapidapi.p.rapidapi.com/words/${wordToInfo}`, {
                "method": "GET",
                "headers": {
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                "x-rapidapi-key": "3755c9b89cmsh3b1ef8c9dc83f60p158504jsnbafd9da0c9be"
                }
            })
            .then(res => res.json()).then(data => {
                dispatch({ type: WORD_SUCCESS, payload: data })
            })
        } catch(e) {
            dispatch({ type: WORD_FAIL})
        }
    } else (
        dispatch({ type: WORD_NULL})
    )
}
export const DictionaryPaginationGetCurrentPage = (currentResults: ResultsType[], page: number) => ({
    type: DICTIONARY_PAGINATION_GET_CURRENT_PAGE,
    array: currentResults, page: page
})