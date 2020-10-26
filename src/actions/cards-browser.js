import { getCardList } from '../utilites/mockAPI'

// cards-browser
export const loadCardList = () => dispatch => {
    getCardList()
    .then(res => { 
        dispatch({ type: 'CARD_LIST_LOADED', payload: res }) 
    })
    .catch(rej => {
        console.log(rej)
    })
}