import {
    CardCollectionType,
    CardCollectionDispatchTypes,
    CARD_COLLECTION_LOADING,
    CARD_COLLECTION_SUCCESS,
    CARD_COLLECTION_FAIL
} from "../types/cardCollectionTypes";
  
interface DefaultStateI {
    cardCollectionLoading: boolean
    cardCollectionLoaded: boolean
    cardCollection: CardCollectionType
}
const defaultState: DefaultStateI = {
    cardCollectionLoading: false,
    cardCollectionLoaded: true,
    cardCollection: []
}
  
const cardCollectionReducer = (state: DefaultStateI = defaultState, action: CardCollectionDispatchTypes) : DefaultStateI => {
    switch (action.type) {
        case CARD_COLLECTION_LOADING: {
            return {
                ...state,
                cardCollectionLoaded: true,
                cardCollectionLoading: true
            }
        }
        case CARD_COLLECTION_SUCCESS:
            return {
                ...state,
                cardCollectionLoading: false,
                cardCollectionLoaded: true,
                cardCollection: action.payload
            }
        case CARD_COLLECTION_FAIL:
            return {
                ...state,
                cardCollectionLoading: false,
                cardCollectionLoaded: false
            }
        default:
            return state
    }
}
  
export default cardCollectionReducer