import data from '../db.json'

// db loading
export const loadData = () => (dispatch) => {
    // fetch('http://localhost:3000/cards').then(
    //     res => res.json()
    // ).then(data => {
    //     dispatch({ type: 'CARDS_LOADED', payload: data })
    // })
    setTimeout(() => {
        dispatch({ type: 'CARDS_LOADED', payload: data })
    }, 500)
}

// dictionary
export const onChangeWordInput = (wordInput) => ({
    type: 'ON_CHANGE_WORD_INPUT',
    payload: wordInput.target.value
})
export const showInfo = (wordToInfo) => (dispatch) => {
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
}

// card-game
export const onItemClick = (title, selectedTitle) => ({
    type: 'ON_ITEM_CLICK',
    payload: title,
    selectedTitle: selectedTitle
})
export const onBackToCategories = () => ({
    type: 'ON_BACK_TO_CATEGORIES'
})

// categories
export const onChooseCat = (title) => ({
    type: 'ON_CATEGORY_CHOSEN',
    payload: title
})

// welcome
export const onGameStarted = () => ({
    type: 'ON_GAME_STARTED'
})