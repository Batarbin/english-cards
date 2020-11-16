import {
    CardCollectionType,
    CardCollectionDispatchTypes,
    CARD_COLLECTION_LOADING,
    CARD_COLLECTION_SUCCESS,
    CARD_COLLECTION_FAIL,
    CARD_COLLECTION_SEARCH_LOADING,
    CARD_COLLECTION_SEARCH,
    CARD_COLLECTION_SEARCH_NULL
} from "../types/cardCollectionTypes";
  
interface DefaultStateI {
    // collection
    cardCollectionLoading: boolean
    cardCollectionLoaded: boolean
    cardCollection: CardCollectionType
    // search
    cardCollectionSearchLoading: boolean
    isNull: boolean
    searchResultArr: CardCollectionType
}
const defaultState: DefaultStateI = {
    // collection
    cardCollectionLoading: false,
    cardCollectionLoaded: true,
    cardCollection: [],
    // search
    cardCollectionSearchLoading: false,
    isNull: true,
    searchResultArr: []
}
  
const cardCollectionReducer = (state: DefaultStateI = defaultState, action: CardCollectionDispatchTypes) : DefaultStateI => {
    switch (action.type) {
        // collection
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
        // search
        case CARD_COLLECTION_SEARCH_LOADING:
            return {
                ...state,
                cardCollectionSearchLoading: true
            }
        case CARD_COLLECTION_SEARCH:
            let arr: CardCollectionType = []
            if (state.cardCollection.length) {
                arr = state.cardCollection.filter(x => x.title.includes(action.payload))
            }
            return {
                ...state,
                searchResultArr: arr,
                cardCollectionSearchLoading: false,
                isNull: false
            }
        case CARD_COLLECTION_SEARCH_NULL:
            return {
                ...state,
                cardCollectionSearchLoading: false,
                isNull: true
            }
        default:
            return state
    }
}
  
export default cardCollectionReducer