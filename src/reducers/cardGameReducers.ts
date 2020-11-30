import {
    CategoriesListType, CategoriesCardsType, GameListType, CATEGORIES_LIST_LOADING, CATEGORIES_LIST_SUCCESS, CATEGORIES_LIST_FAIL, 
    ON_CATEGORY_CHOSEN, CATEGORIES_CARDS_SUCCESS, CATEGORIES_CARD_FAIL, GAME_LIST_SUCCESS, GAME_LIST_FAIL, ON_GAME_CHOSEN,
    CardType, CHOOSE_ONE_TABLE_LOADED, WRITE_IT_LOADED, ON_CARD_CHOSEN, ON_BACK_TO_CATEGORIES, CONTINUE_WITH_THIS_CATEGORY, CONTINUE_WITH_THIS_GAME_MODE,
    CardTableDispatchTypes
} from "../types/cardGameTypes";
  
interface DefaultStateI {
    // categories
    categoriesListLoading: boolean
    categoriesListLoaded: boolean
    chosen: boolean
    chosenCategory: string
    categoriesList: CategoriesListType
    // gameLobby
    categoriesCardListLoading: boolean
    categoriesCardListLoaded: boolean
    categoriesCardList: CategoriesCardsType
    gameListLoading: boolean
    gameListLoaded: boolean
    gameList: GameListType
    isGameChosen: boolean
    gameId: number
    // chooseOne
    chooseOneTable: CardType
    // writeIt
    writeItTable: CardType
    // cardGameGlobal
    result: boolean
    globalCount: number
    resultCount: number
    isAnswered: boolean
    animationKey: number
    selectedTitle: string
}
const defaultState: DefaultStateI = {
    // categories
    categoriesListLoading: false,
    chosen: false,
    categoriesListLoaded: true,
    chosenCategory: '',
    categoriesList: [],
    // gameLobby
    categoriesCardListLoaded: true,
    categoriesCardListLoading: false,
    categoriesCardList: [],
    gameListLoaded: true,
    gameListLoading: false,
    gameList: [],
    isGameChosen: false,
    gameId: 0,
    // chooseOne
    chooseOneTable: [],
    // writeIt
    writeItTable: [],
    // cardGameGlobal
    result: false,
    globalCount: 0,
    resultCount: 0,
    isAnswered: false,
    animationKey: 0,
    selectedTitle: ''
}

const getUniqueIdx = (collection: number[] = [], length: number): number => {
    const idx: number = Math.round(Math.random() * (length-1))
    if(collection.includes(idx)) {
        return getUniqueIdx(collection, length)
    }
    return idx
}
  
const cardGameReducer = (state: DefaultStateI = defaultState, action: CardTableDispatchTypes) : DefaultStateI => {
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
                globalCount: 0,
                resultCount: 0,
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
                chosenCategory: action.payload,
                categoriesCardListLoading: true,
                categoriesCardListLoaded: true,
                chosen: true
            }
        // gameLobby
        case CATEGORIES_CARDS_SUCCESS:
            const categoriesCardList = action.payload.filter(x => x.type === state.chosenCategory)
            return {
                ...state,
                categoriesCardListLoading: false,
                categoriesCardListLoaded: true,
                categoriesCardList,
                isGameChosen: false,
                gameId: 0,
            }
        case CATEGORIES_CARD_FAIL:
            return {
                ...state,
                categoriesCardListLoading: false,
                categoriesCardListLoaded: false,
            }
        case GAME_LIST_SUCCESS:
            return {
                ...state,
                gameListLoading: false,
                gameListLoaded: true,
                gameList: action.payload
            }
        case GAME_LIST_FAIL:
            return {
                ...state,
                gameListLoading: false,
                gameListLoaded: false,
            }
        case ON_GAME_CHOSEN:
            return {
                ...state,
                isGameChosen: true,
                gameId: action.payload
            }
        // chooseOne
        case CHOOSE_ONE_TABLE_LOADED:
            const chooseOneTable: CardType = [],
                  chooseOneTemp: number[] = []

            for (let i = 0; i < 3; i++) {
                const i: number = getUniqueIdx(chooseOneTemp, state.categoriesCardList.length)
                chooseOneTemp.push(i)
                chooseOneTable.push(state.categoriesCardList[i])
            }
            const chooseOneSelectedTitle = chooseOneTable[getUniqueIdx([], 3)].title

            return {
                ...state,
                chooseOneTable,
                selectedTitle: chooseOneSelectedTitle,
                isAnswered: false,
                animationKey: state.animationKey + 1,
                globalCount: state.globalCount + 1
            }
        // writeIt
        case WRITE_IT_LOADED:
            const writeItTable: CardType = []
            writeItTable.push(state.categoriesCardList[Math.round(Math.random() * (state.categoriesCardList.length-1))])

            const writeItSelectedTitle = writeItTable[Math.round(Math.random() * (writeItTable.length-1))].title

            return {
                ...state,
                writeItTable,
                selectedTitle: writeItSelectedTitle,
                isAnswered: false,
                animationKey: state.animationKey + 1,
                globalCount: state.globalCount + 1
            }
        // cardGameGlobal
        case ON_CARD_CHOSEN:
            const result = action.payload.toLowerCase() === state.selectedTitle
            let resultCount = 0
            if (result) {
                resultCount = state.resultCount + 1
            } else {
                resultCount = 0
            }

            return {
                ...state,
                result,
                resultCount,
                isAnswered: true
            }
        case ON_BACK_TO_CATEGORIES:
            return {
                ...state,
                categoriesList: [],
                categoriesCardList: [],
                chosenCategory: '',
                globalCount: 0,
                resultCount: 0,
                chosen: false,
                isAnswered: false,
                isGameChosen: false,
                gameId: 0,
            }
        case CONTINUE_WITH_THIS_CATEGORY:
            return {
                ...state,
                globalCount: 0,
                resultCount: 0,
                isGameChosen: false,
                gameId: 0
            }
        case CONTINUE_WITH_THIS_GAME_MODE:
            return {
                ...state,
                globalCount: 0,
                resultCount: 0
            }
        default:
            return state
    }
}
  
export default cardGameReducer