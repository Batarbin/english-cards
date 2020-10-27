const initialState = {
    cardList: []
}
export default function cardsBrowserReducer(state = initialState, action) {
    switch (action.type) {
        case 'CARD_LIST_LOADED': {
            return {
                ...state,
                cardList: action.payload
            }
        }
        default:
            return state;
    }
}