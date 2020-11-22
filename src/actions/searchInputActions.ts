import { GET_SEARCH_INPUT_VALUE } from '../types/searchInputTypes'

export const GetSearchInputValue = (value: string) => ({
    type: GET_SEARCH_INPUT_VALUE,
    payload: value
})