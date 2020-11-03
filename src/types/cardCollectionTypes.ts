export const CARD_COLLECTION_LOADING = "CARD_LIST_LOADING"
export const CARD_COLLECTION_SUCCESS = "CARD_LIST_SUCCESS"
export const CARD_COLLECTION_FAIL = "CARD_LIST_FAIL"

// reducer
export type CardCollectionType = {
    title: string
    url: string
    pronunciation: string
    translation: string
    id: number
    type: string
}[]

// actions
export interface CardCollectionLoading {
    type: typeof CARD_COLLECTION_LOADING
}
export interface CardCollectionSuccess {
    type: typeof CARD_COLLECTION_SUCCESS,
    payload: CardCollectionType
}
export interface CardCollectionFail {
    type: typeof CARD_COLLECTION_FAIL
}

export type CardCollectionDispatchTypes = CardCollectionLoading | CardCollectionSuccess | CardCollectionFail