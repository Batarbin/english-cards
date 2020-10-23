const initialState = {
    categories: [],
    foodData: [],
    plantsData: [],
    cardList: [],
    wordInfo: [],
    foodTitle: null,
    plantsTitle: null,
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
const getCards = (act, dataArr, cardsArr, type) => {
    let temp = []
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
        case 'LOAD_DATA': {
            return {
                categories: [],
                foodData: [],
                plantsData: [],
                cardList: [],
                foodTitle: null,
                plantsTitle: null,
                result: null,
                isAnswered: false
            }
        }
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
                ...state,
                isStarted: true
            }
        }
        case 'ON_CATEGORY_CHOSEN': {
            let category = action.payload
            return {
                ...state,
                category,
                chosen: true
            }
        }
        case 'CARDS_LOADED': {
            const data = action.payload
            let cardList = [...data.cards],
                foodData = [],
                foodCards = [],
                plantsData = [],
                plantsCards = []

            foodCards = getCards(cardList, foodData, foodCards, 'food')
            plantsCards = getCards(cardList , plantsData, plantsCards, 'plants')
        
            return {
                ...state,
                foodCards,
                plantsCards,
                cardList,
                categories: [...data.categories],
                foodTitle: foodCards[ getUniqueIdx([], NUMBER_OF_CARDS) ].title,
                plantsTitle: plantsCards[ getUniqueIdx([], NUMBER_OF_CARDS) ].title,
                result: null,
                isAnswered: false,
                isStarted: true
            }
        }
        case 'ON_ITEM_CLICK': {
            return {
                ...state,
                result: action.payload === action.selectedTitle,
                isAnswered: true
            }
        }
        case 'ON_BACK_TO_CATEGORIES': {
            return {
                ...state,
                chosen: false,
                isAnswered:false
            }
        }
        default:
            return state;
    }
}

export default reducer;