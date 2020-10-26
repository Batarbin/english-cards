import { getCards, getCategories } from '../utilites/mockAPI'

// categories
export const loadCategories = () => dispatch => {
    getCategories()
    .then(res => { 
        dispatch({ type: 'CATEGORIES_LOADED', payload: res }) 
    })
    .catch(rej => {
        console.log(rej)
    })
}
export const onCategoryChosen = (title) => dispatch => {
    dispatch({ type: 'ON_CATEGORY_CHOSEN' }) 

    getCards(title)
    .then(res => { 
        dispatch({ type: 'ON_CATEGORY_CARD_LIST_LOADED', payload: res }) 
    })
    .catch(rej => {
        console.log(rej)
    })
}

// card-game
export const cardsTableLoaded = () => ({
    type: 'CARDS_TABLE_LOADED'
})
export const onItemClick = (title) => ({
    type: 'ON_ITEM_CLICK',
    payload: title
})
export const onBackToCategories = () => ({
    type: 'ON_BACK_TO_CATEGORIES'
})