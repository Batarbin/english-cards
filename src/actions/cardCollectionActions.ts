import { Dispatch } from 'redux'
import { CardCollectionDispatchTypes, CARD_COLLECTION_LOADING, CARD_COLLECTION_SUCCESS, CARD_COLLECTION_FAIL,
         CARD_COLLECTION_SEARCH_LOADING, CARD_COLLECTION_SEARCH, CARD_COLLECTION_SEARCH_NULL
} from '../types/cardCollectionTypes'

export const GetCollectionList = () => async (dispatch: Dispatch<CardCollectionDispatchTypes>) => {
    dispatch({ type: CARD_COLLECTION_LOADING })
    try {
        await fetch(`http://localhost:3001/cards`)
        .then(res => res.json()).then(data => {
            dispatch({ type: CARD_COLLECTION_SUCCESS, payload: data })
        })
    } catch(e) {
        dispatch({ type: CARD_COLLECTION_FAIL})
    }
}
export const CardCollectionSearchLoading = () => ({
    type: CARD_COLLECTION_SEARCH_LOADING
})
export const GetCollectionSearchResults = (query: string) => (dispatch: Dispatch<CardCollectionDispatchTypes>) => {
    if (query.length) {
        dispatch({ type: CARD_COLLECTION_SEARCH, payload: query })
    } else {
        dispatch({ type: CARD_COLLECTION_SEARCH_NULL })
    }
}