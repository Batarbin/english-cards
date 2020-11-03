import { Dispatch } from 'redux'
import { CardCollectionDispatchTypes, CARD_COLLECTION_LOADING, CARD_COLLECTION_SUCCESS, CARD_COLLECTION_FAIL } from '../types/cardCollectionTypes'
import { getCollectionList } from '../api/mockAPI'

export const GetCollectionList = () => async (dispatch: Dispatch<CardCollectionDispatchTypes>) => {
    dispatch({ type: CARD_COLLECTION_LOADING })
    await getCollectionList()
    .then(res => {
        dispatch({ type: CARD_COLLECTION_SUCCESS, payload: res })
    })
    .catch(rej => {
        dispatch({ type: CARD_COLLECTION_FAIL})
    })
}