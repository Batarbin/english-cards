export const CARD_COLLECTION_LOADING = "CARD_LIST_LOADING"
export const CARD_COLLECTION_SUCCESS = "CARD_LIST_SUCCESS"
export const CARD_COLLECTION_FAIL = "CARD_LIST_FAIL"
export const CARD_COLLECTION_SEARCH_LOADING = "CARD_COLLECTION_SEARCH_LOADING"
export const CARD_COLLECTION_SEARCH = "CARD_COLLECTION_SEARCH"
export const CARD_COLLECTION_SEARCH_NULL = "CARD_COLLECTION_SEARCH_NULL"

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
// collection
export interface CardCollectionLoading {
    type: typeof CARD_COLLECTION_LOADING
}
export interface CardCollectionSuccess {
    type: typeof CARD_COLLECTION_SUCCESS
    payload: CardCollectionType
}
export interface CardCollectionFail {
    type: typeof CARD_COLLECTION_FAIL
}
// search
export interface CardCollectionSearchLoading {
    type: typeof CARD_COLLECTION_SEARCH_LOADING
}
export interface CardCollectionSearch {
    type: typeof CARD_COLLECTION_SEARCH
    payload: string
}
export interface CardCollectionSearchNull {
    type: typeof CARD_COLLECTION_SEARCH_NULL
}

export type CardCollectionDispatchTypes = CardCollectionLoading | CardCollectionSuccess | CardCollectionFail | CardCollectionSearchLoading | CardCollectionSearch | CardCollectionSearchNull