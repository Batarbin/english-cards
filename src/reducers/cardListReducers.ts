import {
    CardListType,
    CardListDispatchTypes,
    CARD_LIST_LOADING,
    CARD_LIST_SUCCESS,
    CARD_LIST_FAIL
} from "../types/cardListTypes";
  
interface DefaultStateI {
    cardListLoading: boolean
    cardListLoaded: boolean
    cardList: CardListType
}
const defaultState: DefaultStateI = {
    cardListLoading: false,
    cardListLoaded: false,
    cardList: []
}
  
const cardListReducer = (state: DefaultStateI = defaultState, action: CardListDispatchTypes) : DefaultStateI => {
    switch (action.type) {
        case CARD_LIST_LOADING: {
            return {
                ...state,
                cardListLoading: true,
                cardListLoaded: true
            }
        }
        case CARD_LIST_SUCCESS:
            return {
                ...state,
                cardListLoading: false,
                cardListLoaded: true,
                cardList: action.payload
            }
        case CARD_LIST_FAIL:
            return {
                ...state,
                cardListLoading: false,
                cardListLoaded: false
            }
        default:
            return state
    }
}
  
export default cardListReducer