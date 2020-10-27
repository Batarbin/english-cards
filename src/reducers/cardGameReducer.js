const initialState = {
    categories: [],
    chosenCategoryCardList: [],
    cardsTable: [],
    count: 0,
    selectedTitle: null,
    result: null,
    chosen: false,
    isAnswered: false
}

const NUMBER_OF_CARDS = 3
const getUniqueIdx = (collection, length) => {
    const idx = Math.round(Math.random() * (length-1))
    if(collection.includes(idx)) {
        return getUniqueIdx(collection, length)
    }
    return idx
}

export default function cardGameReducer(state = initialState, action) {
    switch (action.type) {
        case 'CATEGORIES_LOADED': {
            return {
                ...state,
                categories: [...action.payload],
                cardsTable: []
            }
        }
        case 'ON_CATEGORY_CHOSEN': {
            return {
                ...state,
                chosen: true
            }
        }
        case 'ON_CATEGORY_CARD_LIST_LOADED': {
            return {
                ...state,
                chosenCategoryCardList: action.payload
            }
        }
        case 'CARDS_TABLE_LOADED': {
            let temp = [],
                cardsTable = [],
                selectedTitle = null

            for (let i = 0; i < NUMBER_OF_CARDS; i++) {
                const i = getUniqueIdx(temp, state.chosenCategoryCardList.length)
                temp.push(i)
                cardsTable.push(state.chosenCategoryCardList[i])
            }
            
            selectedTitle = cardsTable[ getUniqueIdx([], NUMBER_OF_CARDS) ].title

            return {
                ...state,
                cardsTable,
                selectedTitle,
                result: null,
                isAnswered: false,
                count: state.count + 1
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
                ...state,
                categories: [],
                chosenCategoryCardList: [],
                chosen: false,
                isAnswered: false
            }
        }
        default:
            return state
    }
}