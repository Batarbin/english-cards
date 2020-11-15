import { Dispatch } from 'redux'
import { CardCollectionDispatchTypes, CARD_COLLECTION_LOADING, CARD_COLLECTION_SUCCESS, CARD_COLLECTION_FAIL } from '../types/cardCollectionTypes'

export const GetCollectionList = () => async (dispatch: Dispatch<CardCollectionDispatchTypes>) => {
    dispatch({ type: CARD_COLLECTION_LOADING })
    try {
        await fetch(`http://localhost:3001/cards`)
        .then(res => res.json()).then(data => {
            // setTimeout(() => {
                dispatch({ type: CARD_COLLECTION_SUCCESS, payload: data })
            // }, 1000)
        })
    } catch(e) {
        dispatch({ type: CARD_COLLECTION_FAIL})
    }
}