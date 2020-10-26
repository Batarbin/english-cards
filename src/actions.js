import { getCards, getCategories, getCardList } from './mock'

// dictionary
export const showInfo = (wordToInfo) => dispatch => {
    if (wordToInfo.length) {
        fetch('https://rapidapi.p.rapidapi.com/words/'+wordToInfo, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                "x-rapidapi-key": "3755c9b89cmsh3b1ef8c9dc83f60p158504jsnbafd9da0c9be"
            }
        })
        .then(res => res.json()).then(data => {
            dispatch({type: 'SHOW_INFO', payload: data})
        })
        .catch(err => {
            console.error(err);
        });
    } else {
        dispatch({ type: 'SHOW_INFO', payload: null })
    }
}

// welcome
export const onGameStarted = () => ({
    type: 'ON_GAME_STARTED'
})

// categories
export const loadCategories = () => dispatch => {
    getCategories()
    .then(res => { 
        dispatch({ type: 'CATEGORIES_LOADED', payload: res }) 
    })
}
export const onCategoryChosen = (title) => dispatch => {
    dispatch({ type: 'ON_CATEGORY_CHOSEN' }) 

    getCards(title)
    .then(res => { 
        dispatch({ type: 'ON_CATEGORY_CARD_LIST_LOADED', payload: res }) 
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

// cards-browser
export const loadCardList = () => dispatch => {
    getCardList()
    .then(res => { 
        dispatch({ type: 'CARD_LIST_LOADED', payload: res }) 
    })
}