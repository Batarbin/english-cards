import {
    CardListType,
    CardListDispatchTypes,
    CARD_LIST_SUCCESS,
    CARD_LIST_FAIL
} from "../types/cardListTypes";
  
interface DefaultStateI {
    cardListLoaded: boolean
    cardList: CardListType
}
const defaultState: DefaultStateI = {
    cardListLoaded: false,
    cardList: []
}
  
const cardListReducer = (state: DefaultStateI = defaultState, action: CardListDispatchTypes) : DefaultStateI => {
    switch (action.type) {
        case CARD_LIST_SUCCESS:
            return {
                ...state,
                cardListLoaded: true,
                cardList: action.payload
            }
        case CARD_LIST_FAIL:
            return {
                ...state,
                cardListLoaded: false
            }
        default:
            return state
    }
}
  
export default cardListReducer