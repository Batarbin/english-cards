export const WORD_LOADING = "WORD_LOADING"
export const WORD_SUCCESS = "WORD_SUCCESS"
export const WORD_FAIL = "WORD_FAIL"
export const WORD_NULL = "WORD_NULL"
export const DICTIONARY_PAGINATION_GET_CURRENT_PAGE = "DICTIONARY_PAGINATION_GET_CURRENT_PAGE"

// reducers
export type WordType = {
    success: boolean
    word: string
    pronunciation?: PronunciationType
    results: ResultsType[]
}
export type ResultsType = {
    partOfSpeech: string
    definition: string
    examples?: string[]
    synonyms?: string[]
}
export type PronunciationType = {
    all: string
    noun?: string
    verb?: string
}

// actions
export interface WordLoading {
    type: typeof WORD_LOADING
}
export interface WordSuccess {
    type: typeof WORD_SUCCESS
    payload: WordType
}
export interface WordFail {
    type: typeof WORD_FAIL
}
export interface WordNull {
    type: typeof WORD_NULL
}
export interface DictionaryPaginationGetCurrentPage {
    type: typeof DICTIONARY_PAGINATION_GET_CURRENT_PAGE
    array: ResultsType[]
    page: number
}

export type WordDispatchTypes = WordLoading | WordSuccess | WordFail | WordNull | DictionaryPaginationGetCurrentPage