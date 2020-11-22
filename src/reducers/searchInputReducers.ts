import {
    SeacrhInputDispatchTypes,
    GET_SEARCH_INPUT_VALUE
} from "../types/searchInputTypes";
  
interface DefaultStateI {
    inputValue: string
}
const defaultState: DefaultStateI = {
    inputValue: ''
}
  
const searchInputReducer = (state: DefaultStateI = defaultState, action: SeacrhInputDispatchTypes) : DefaultStateI => {
    switch (action.type) {
        case GET_SEARCH_INPUT_VALUE:
            return {
                ...state,
                inputValue: action.payload
            }
        default:
            return state
    }
}
  
export default searchInputReducer