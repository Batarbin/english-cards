import { Dispatch } from 'redux'
import { CategoriesListDispatchTypes, CATEGORIES_LIST_LOADING, CATEGORIES_LIST_SUCCESS, CATEGORIES_LIST_FAIL, 
        CategoriesCardsDispatchTypes, ON_CATEGORY_CHOSEN, CATEGORIES_CARDS_SUCCESS, CATEGORIES_CARD_FAIL,
        CARD_TABLE_LOADED, ON_CARD_CHOSEN, ON_BACK_TO_CATEGORIES } from '../types/cardGameTypes'

// categories
export const GetCategoriesList = () => async (dispatch: Dispatch<CategoriesListDispatchTypes>) => {
    dispatch({ type: CATEGORIES_LIST_LOADING })
    try {
        await fetch(`http://localhost:3001/categories`)
        .then(res => res.json()).then(data => {
            // setTimeout(() => {
                dispatch({ type: CATEGORIES_LIST_SUCCESS, payload: data })
            // }, 1000)
        })
    } catch(e) {
        dispatch({ type: CATEGORIES_LIST_FAIL})
    }
}
export const GetCategoryCards = (title: string) => async (dispatch: Dispatch<CategoriesCardsDispatchTypes>) => {
    dispatch({ type: ON_CATEGORY_CHOSEN, payload: title })

    try {
        await fetch(`http://localhost:3001/cards`)
        .then(res => res.json()).then(data => {
            // setTimeout(() => {
                dispatch({ type: CATEGORIES_CARDS_SUCCESS, payload: data })
            // }, 1000)
        })
    } catch(e) {
        dispatch({ type: CATEGORIES_CARD_FAIL})
    }
}
// cardTable
export const CardTableLoaded = () => ({
    type: CARD_TABLE_LOADED
})
export const OnCardChosen = (title: string) => ({
    type: ON_CARD_CHOSEN,
    payload: title
})
export const OnBackToCategories = () => ({
    type: ON_BACK_TO_CATEGORIES
})