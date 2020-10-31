import { Dispatch } from 'redux'
import { CardListDispatchTypes, CARD_LIST_LOADING, CARD_LIST_SUCCESS, CARD_LIST_FAIL } from '../types/cardListTypes'
import { getCardList } from '../api/mockAPI'

export const GetCardList = () => async (dispatch: Dispatch<CardListDispatchTypes>) => {
    dispatch({ type: CARD_LIST_LOADING })
    await getCardList()
    .then(res => {
        dispatch({ type: CARD_LIST_SUCCESS, payload: res })
    })
    .catch(rej => {
        dispatch({ type: CARD_LIST_FAIL})
    })
}