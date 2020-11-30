import {
    SeacrhInputDispatchTypes,
    GET_SEARCH_INPUT_VALUE
} from "../types/searchInputTypes";
  
interface DefaultStateI {
    searchInputValue: string
}
const defaultState: DefaultStateI = {
    searchInputValue: ''
}
  
const searchInputReducer = (state: DefaultStateI = defaultState, action: SeacrhInputDispatchTypes) : DefaultStateI => {
    switch (action.type) {
        case GET_SEARCH_INPUT_VALUE:
            return {
                ...state,
                searchInputValue: action.payload
            }
        default:
            return state
    }
}
  
export default searchInputReducer