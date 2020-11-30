// categories
export const CATEGORIES_LIST_LOADING = "CATEGORIES_LIST_LOADING"
export const CATEGORIES_LIST_SUCCESS = "CATEGORIES_LIST_SUCCESS"
export const CATEGORIES_LIST_FAIL = "CATEGORIES_LIST_FAIL"
export const ON_CATEGORY_CHOSEN = "ON_CATEGORY_CHOSEN"
// gameLobby
export const CATEGORIES_CARDS_SUCCESS = "CATEGORIES_CARDS_SUCCESS"
export const CATEGORIES_CARD_FAIL = "CATEGORIES_CARD_FAIL"
export const GAME_LIST_SUCCESS = "GAME_LIST_SUCCESS"
export const GAME_LIST_FAIL = "GAME_LIST_FAIL"
export const ON_GAME_CHOSEN = "ON_GAME_CHOSEN"
// chooseOne
export const CHOOSE_ONE_TABLE_LOADED = "CHOOSE_ONE_TABLE_LOADED"
// writeIt
export const WRITE_IT_LOADED = "WRITE_IT_LOADED"
// cardGameGlobal
export const ON_CARD_CHOSEN = "ON_CARD_CHOSEN"
export const ON_BACK_TO_CATEGORIES = "ON_BACK_TO_CATEGORIES"
export const CONTINUE_WITH_THIS_GAME_MODE = "CONTINUE_WITH_THIS_GAME_MODE"
export const CONTINUE_WITH_THIS_CATEGORY = "CONTINUE_WITH_THIS_CATEGORY"

// categoriesReducer
export type GameListType = {
    title: string
    url: string
    id: number
}[]
export type CategoriesListType = {
    title: string
    url: string
    id: number
}[]
export type CategoriesCardsType = {
    title: string
    url: string
    pronunciation: string
    translation: string
    id: number
    type: string
}[]
// cardGameReducer
export type CardType = {
    title: string
    url: string
    pronunciation: string
    translation: string
    id: number
    type: string
}[]

// categoriesActions
export interface CategoriesListLoading {
    type: typeof CATEGORIES_LIST_LOADING
}
export interface CategoriesListSuccess {
    type: typeof CATEGORIES_LIST_SUCCESS
    payload: CategoriesListType
}
export interface CategoriesListFail {
    type: typeof CATEGORIES_LIST_FAIL
}
export interface OnCategoryChosen {
    type: typeof ON_CATEGORY_CHOSEN
    payload: string
}
// gameLobby
export interface CategoriesCardsSuccess {
    type: typeof CATEGORIES_CARDS_SUCCESS
    payload: CategoriesCardsType
}
export interface CategoriesCardsFail {
    type: typeof CATEGORIES_CARD_FAIL
}
export interface GameListSuccess {
    type: typeof GAME_LIST_SUCCESS
    payload: CategoriesCardsType
}
export interface GameListFail {
    type: typeof GAME_LIST_FAIL
}
export interface OnGameChosen {
    type: typeof ON_GAME_CHOSEN
    payload: number
}
// chooseOneActions
export interface ChooseOneTableLoaded {
    type: typeof CHOOSE_ONE_TABLE_LOADED
}
// writeItActions
export interface WriteItLoaded {
    type: typeof WRITE_IT_LOADED
}
// cardGameGlobalActions
export interface OnCardChosen {
    type: typeof ON_CARD_CHOSEN
    payload: string
}
export interface OnBackToCategories {
    type: typeof ON_BACK_TO_CATEGORIES
}
export interface ContinueWithThisGameMode {
    type: typeof CONTINUE_WITH_THIS_GAME_MODE
}
export interface ContinueWithThisCategory {
    type: typeof CONTINUE_WITH_THIS_CATEGORY
}

// categoriesDispatchTypes
export type CategoriesListDispatchTypes = CategoriesListLoading | CategoriesListSuccess | CategoriesListFail | OnCategoryChosen
// gameLobbyDispatchTypes
export type GameLobbyDispatchTypes = CategoriesCardsSuccess | CategoriesCardsFail | GameListSuccess | GameListFail | OnGameChosen
// cardGamesDispatchTypes
export type CardGamesDispatchTypes = ChooseOneTableLoaded | WriteItLoaded 
// cardGameGlobalDispatchTypes
export type CardGameGlobalDispatchTypes = OnCardChosen | OnBackToCategories | ContinueWithThisGameMode | ContinueWithThisCategory
// cardGameDispatchTypes
export type CardTableDispatchTypes = CategoriesListDispatchTypes | GameLobbyDispatchTypes | CardGamesDispatchTypes | CardGameGlobalDispatchTypes