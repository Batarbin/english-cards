const initialState = {
    wordInfo: [],
    showInfoBool: false
}

export default function welcomeReducer(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_INFO': {
            let showInfoBool = true
            if (action.payload === null) {
                showInfoBool = false
            }
            return {
                ...state,
                wordInfo: action.payload,
                showInfoBool
            }
        }
        default:
            return state
    }
}