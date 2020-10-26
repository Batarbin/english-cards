const initialState = {
    cardList: [],
    isStarted: false
}
export default function cardsBrowserReducer(state = initialState, action) {
    switch (action.type) {
        case 'CARD_LIST_LOADED': {
            return {
                ...state,
                cardList: action.payload,
                isStarted: true
            }
        }
        default:
            return state;
    }
}