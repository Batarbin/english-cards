// categories
export const CATEGORIES_LIST_SUCCESS = "CATEGORIES_LIST_SUCCESS"
export const CATEGORIES_LIST_FAIL = "CATEGORIES_LIST_FAIL"
export const ON_CATEGORY_CHOSEN = "ON_CATEGORY_CHOSEN"
export const CATEGORIES_CARDS_SUCCESS = "CATEGORIES_CARDS_SUCCESS"
export const CATEGORIES_CARD_FAIL = "CATEGORIES_CARD_FAIL"
// cardTable
export const CARD_TABLE_LOADED = "CARD_TABLE_LOADED"
export const ON_CARD_CHOSEN = "ON_CARD_CHOSEN"
export const ON_BACK_TO_CATEGORIES = "ON_BACK_TO_CATEGORIES"

// categoriesReducer
export type CategoriesListType = {
    title: string,
    url: string,
    id: number
}[]
export type CategoriesCardsType = {
    title: string,
    url: string,
    pronunciation: string,
    translation: string,
    id: number,
    type: string
}[]
// cardTableReducer
export type CardTableType = {
    title: string,
    url: string,
    pronunciation: string,
    translation: string,
    id: number,
    type: string
}[]

// categoriesActions
export interface CategoriesListSuccess {
    type: typeof CATEGORIES_LIST_SUCCESS,
    payload: CategoriesListType
}
export interface CategoriesListFail {
    type: typeof CATEGORIES_LIST_FAIL
}
export interface OnCategoryChosen {
    type: typeof ON_CATEGORY_CHOSEN
}
export interface CategoriesCardsSuccess {
    type: typeof CATEGORIES_CARDS_SUCCESS,
    payload: CategoriesCardsType
}
export interface CategoriesCardsFail {
    type: typeof CATEGORIES_CARD_FAIL
}
// cardTableActions
export interface CardTableLoaded {
    type: typeof CARD_TABLE_LOADED,
}
export interface OnCardChosen {
    type: typeof ON_CARD_CHOSEN,
    payload: string
}
export interface OnBackToCategories {
    type: typeof ON_BACK_TO_CATEGORIES,
}

// categoriesDispatchTypes
export type CategoriesListDispatchTypes = CategoriesListSuccess | CategoriesListFail
export type CategoriesCardsDispatchTypes = OnCategoryChosen | CategoriesCardsSuccess | CategoriesCardsFail
export type CategoriesDispatchTypes = CategoriesListDispatchTypes | CategoriesCardsDispatchTypes
// cardTableDispatchTypes
export type CardTableDispatchTypes = CardTableLoaded | OnCardChosen | OnBackToCategories
// cardGameDispatchTypes
export type CardGameDispatchTypes = CategoriesDispatchTypes | CardTableDispatchTypes