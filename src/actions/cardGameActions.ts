import { Dispatch } from 'redux'
import { CategoriesListDispatchTypes, CATEGORIES_LIST_LOADING, CATEGORIES_LIST_SUCCESS, CATEGORIES_LIST_FAIL, 
        GameLobbyDispatchTypes, ON_CATEGORY_CHOSEN, CATEGORIES_CARDS_SUCCESS, CATEGORIES_CARD_FAIL,
        GAME_LIST_SUCCESS, GAME_LIST_FAIL, ON_GAME_CHOSEN,
        CHOOSE_ONE_TABLE_LOADED, WRITE_IT_LOADED, ON_CARD_CHOSEN, ON_BACK_TO_CATEGORIES, CONTINUE_WITH_THIS_GAME_MODE, CONTINUE_WITH_THIS_CATEGORY } from '../types/cardGameTypes'

// categories
export const GetCategoriesList = () => async (dispatch: Dispatch<CategoriesListDispatchTypes>) => {
    dispatch({ type: CATEGORIES_LIST_LOADING })
    try {
        await fetch(`http://localhost:3001/categories`)
        .then(res => res.json()).then(data => {
            dispatch({ type: CATEGORIES_LIST_SUCCESS, payload: data })
        })
    } catch(e) {
        dispatch({ type: CATEGORIES_LIST_FAIL})
    }
}
export const GetCategoryName = (category: string) => ({
    type: ON_CATEGORY_CHOSEN, 
    payload: category
})
// gameLobby
export const GetCategoryCards = () => async (dispatch: Dispatch<GameLobbyDispatchTypes>) => {
    try {
        await fetch(`http://localhost:3001/cards`)
        .then(res => res.json()).then(data => {
            dispatch({ type: CATEGORIES_CARDS_SUCCESS, payload: data })
        })
    } catch(e) {
        dispatch({ type: CATEGORIES_CARD_FAIL})
    }
}
export const GetGameList = () => async (dispatch: Dispatch<GameLobbyDispatchTypes>) => {
    try {
        await fetch(`http://localhost:3001/games`)
        .then(res => res.json()).then(data => {
            dispatch({ type: GAME_LIST_SUCCESS, payload: data })
        })
    } catch(e) {
        dispatch({ type: GAME_LIST_FAIL})
    }
}
export const GetGameId = (id: number) => ({
    type: ON_GAME_CHOSEN, 
    payload: id
})
// chooseOne
export const ChooseOneTableLoaded = () => ({
    type: CHOOSE_ONE_TABLE_LOADED
})
// chooseOne
export const WriteItLoaded = () => ({
    type: WRITE_IT_LOADED
})
// cardGameGlobal
export const OnCardChosen = (title: string) => ({
    type: ON_CARD_CHOSEN,
    payload: title
})
export const OnBackToCategories = () => ({
    type: ON_BACK_TO_CATEGORIES
})
export const ContinueWithThisGameMode = () => ({
    type: CONTINUE_WITH_THIS_GAME_MODE
})
export const ContinueWithThisCategory = () => ({
    type: CONTINUE_WITH_THIS_CATEGORY
})