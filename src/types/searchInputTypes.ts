export const GET_SEARCH_INPUT_VALUE = "GET_SEARCH_INPUT_VALUE"

// actions
export interface GetSearchInputValue {
    type: typeof GET_SEARCH_INPUT_VALUE
    payload: string
}

export type SeacrhInputDispatchTypes = GetSearchInputValue