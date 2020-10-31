import {
    CategoriesListType, CategoriesCardsType, CATEGORIES_LIST_LOADING, CATEGORIES_LIST_SUCCESS, CATEGORIES_LIST_FAIL, 
    ON_CATEGORY_CHOSEN, CATEGORIES_CARDS_SUCCESS, CATEGORIES_CARD_FAIL,
    CardTableType, CARD_TABLE_LOADED, ON_CARD_CHOSEN, ON_BACK_TO_CATEGORIES,
    CardGameDispatchTypes
} from "../types/cardGameTypes";
  
interface DefaultStateI {
    // categories
    categoriesListLoading: boolean
    categoriesListLoaded: boolean
    chosen: boolean
    categoriesCardListLoading: boolean
    categoriesCardListLoaded: boolean
    categoriesList: CategoriesListType
    categoriesCardList: CategoriesCardsType
    // cardTable
    result: boolean
    isAnswered: boolean
    count: number
    cardsTable: CardTableType
    selectedTitle: string
}
const defaultState: DefaultStateI = {
    // categories
    categoriesListLoading: false,
    chosen: false,
    categoriesCardListLoading: false,
    categoriesListLoaded: false,
    categoriesList: [],
    categoriesCardListLoaded: false,
    categoriesCardList: [],
    // cardTable
    result: false,
    isAnswered: false,
    count: 0,
    cardsTable: [],
    selectedTitle: ''
}

const getUniqueIdx = (collection: number[] = [], length: number): number => {
    const idx: number = Math.round(Math.random() * (length-1))
    if(collection.includes(idx)) {
        return getUniqueIdx(collection, length)
    }
    return idx
}
  
const cardGameReducer = (state: DefaultStateI = defaultState, action: CardGameDispatchTypes) : DefaultStateI => {
    switch (action.type) {
        // categories
        case CATEGORIES_LIST_LOADING: {
            return {
                ...state,
                categoriesListLoading: true,
                categoriesListLoaded: true
            }
        }
        case CATEGORIES_LIST_SUCCESS:
            return {
                ...state,
                categoriesListLoading: false,
                categoriesListLoaded: true,
                categoriesList: action.payload
            }
        case CATEGORIES_LIST_FAIL:
            return {
                ...state,
                categoriesListLoading: false,
                categoriesListLoaded: false
            }
        case ON_CATEGORY_CHOSEN:
            return {
                ...state,
                categoriesCardListLoading: true,
                categoriesCardListLoaded: true,
                chosen: true
            }
        case CATEGORIES_CARDS_SUCCESS:
            return {
                ...state,
                categoriesCardListLoading: false,
                categoriesCardListLoaded: true,
                categoriesCardList: action.payload
            }
        case CATEGORIES_CARD_FAIL:
            return {
                ...state,
                categoriesCardListLoading: false,
                categoriesCardListLoaded: false,
            }
        // cardTable
        case CARD_TABLE_LOADED:
            const cardsTable: CardTableType = [],
                  temp: number[] = []

            for (let i = 0; i < 3; i++) {
                const i: number = getUniqueIdx(temp, state.categoriesCardList.length)
                temp.push(i)
                cardsTable.push(state.categoriesCardList[i])
            }
            const selectedTitle = cardsTable[getUniqueIdx([], 3)].title

            return {
                ...state,
                cardsTable,
                selectedTitle,
                isAnswered: false,
                count: state.count + 1
            }
        case ON_CARD_CHOSEN:
            return {
                ...state,
                result: action.payload === state.selectedTitle,
                isAnswered: true
            }
        case ON_BACK_TO_CATEGORIES:
            return {
                ...state,
                categoriesCardList: [],
                chosen: false,
                isAnswered: false
            }
        default:
            return state
    }
}
  
export default cardGameReducer