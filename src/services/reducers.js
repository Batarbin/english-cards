const initialState = {
    wordInfo: [],
    cardList: [],
    categories: [],
    chosenCategory: [],
    category: null,
    selectedTitle: null,
    result: null,
    isAnswered: false,
    isStarted: false,
    showInfoBool: false
}

const NUMBER_OF_CARDS = 3
const getUniqueIdx = (collection, length) => {
    const idx = Math.round(Math.random() * (length-1))
    if(collection.includes(idx)) {
        return getUniqueIdx(collection, length)
    }
    return idx
}
const getCards = (act, cardsArr, type) => {
    let temp = [],
        dataArr = []
    for (let i = 0; i < act.length; i++) {
        if (act[i].type === type) {
            dataArr.push(act[i])
        }
    }
    for (let i = 0; i < NUMBER_OF_CARDS; i++) {
        const i = getUniqueIdx(temp, dataArr.length)
        temp.push(i)
        cardsArr.push(dataArr[i])
    }
    return cardsArr
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_INFO': {
            let showInfoBool = true
            if (action.payload === null) {
                showInfoBool = false
            }
            return {
                wordInfo: action.payload,
                showInfoBool
            }
        }
        case 'ON_GAME_STARTED': {
            return {
                isStarted: true
            }
        }
        case 'CARDS_LOADED': {
            return {
                ...state,
                chosenCategory: [],
                cardList: [...action.payload.cards],
                categories: [...action.payload.categories],
                result: null,
                isAnswered: false,
                isStarted: true
            }
        }
        case 'ON_CATEGORY_CHOSEN': {
            return {
                ...state,
                category: action.payload,
                chosen: true
            }
        }
        case 'CARDS_TABLE_LOADED': {
            let chosenCategory = [],
                selectedTitle = null

            chosenCategory = getCards(state.cardList, chosenCategory, state.category)
            selectedTitle = chosenCategory[ getUniqueIdx([], NUMBER_OF_CARDS) ].title

            return {
                ...state,
                chosenCategory,
                selectedTitle,
                result: null,
                isAnswered: false
            }
        }
        case 'ON_ITEM_CLICK': {
            return {
                ...state,
                result: action.payload === state.selectedTitle,
                isAnswered: true
            }
        }
        case 'ON_BACK_TO_CATEGORIES': {
            return {
                chosen: false,
                isAnswered: false
            }
        }
        default:
            return state;
    }
}

export default reducer;