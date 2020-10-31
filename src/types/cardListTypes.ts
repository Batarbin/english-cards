export const CARD_LIST_LOADING = "CARD_LIST_LOADING"
export const CARD_LIST_SUCCESS = "CARD_LIST_SUCCESS"
export const CARD_LIST_FAIL = "CARD_LIST_FAIL"

// reducer
export type CardListType = {
    title: string,
    url: string,
    pronunciation: string,
    translation: string,
    id: number,
    type: string
}[]

// actions
export interface CardListLoading {
    type: typeof CARD_LIST_LOADING
}
export interface CardListSuccess {
    type: typeof CARD_LIST_SUCCESS,
    payload: CardListType
}
export interface CardListFail {
    type: typeof CARD_LIST_FAIL
}

export type CardListDispatchTypes = CardListLoading | CardListSuccess | CardListFail