import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PronunciationType, ResultsType } from '../types/dictionaryTypes'
import { GetWordInfo } from '../actions/dictionaryActions'
import { GetSearchInputValue } from '../actions/searchInputActions'
import { RootStore } from '../app/store'
import LoadingSpinner from './spinner'
import { SearchInput, SearchInputError } from './misc/searchInput'
import { AboutDictionaryAPIOverlay } from './misc/overlays'
import { DictionaryPagination } from './misc/paginations'

interface WordInformationI {
    results: ResultsType[]
    currentResults: ResultsType[]
    word: string
    pronunciation?: PronunciationType
    currentPage: number,
    pageNumbers: number[]
}
interface InfoResultsI {
    partOfSpeech: string
    definition: string
    examples?: string[]
    synonyms?: string[]
}
interface PronunciationI {
    all: string
    noun?: string
    verb?: string
}

const Pronunciation: FC<PronunciationI> = ({ all, noun, verb }) => {
    if (noun && verb) {
        return (<>
            <p>noun: /{noun}/</p> <p>verb: /{verb}/</p>
        </>)
    } else if (!verb && noun) {
        return <p>/{noun}/</p>
    } else if (!noun && verb) {
        return <p>/{verb}/</p>
    } else if (!noun && !verb && all) {
        return <p>/{all}/</p>
    }
    return null
}
const InfoResults: FC<InfoResultsI> = ({ partOfSpeech, definition, examples, synonyms }) => {
    const dispatch = useDispatch()
    return (
        <li className="list-group-item">
            <p className="dictionary_light">{partOfSpeech}</p>
            <p className="dictionary_heavy">{definition}</p>
            {examples &&  <p className="dictionary_light">"{examples[0]}"</p>}
            {synonyms &&  <p className="synonyms">Synonyms: {
                synonyms.map((item, i) => <span key={i} onClick={() => {dispatch(GetWordInfo(item)); dispatch(GetSearchInputValue(item)) }}>{item}</span>)
            }</p>}
        </li>
    )
}
const WordInformation: FC<WordInformationI> = ({ results, word, pronunciation, currentResults, currentPage, pageNumbers }) => {
    if ( !results || !results.length) {
        return (
            <SearchInputError />
        )
    }

    return (<>
        <ul className="list-group p-2">
            <li className="list-group-item mb-2">
                <AboutDictionaryAPIOverlay />
                <p className="dictionary_heavy word">{word}</p>
                {pronunciation && <div className="dictionary_light"><Pronunciation {...pronunciation}/></div>}
            </li>
            {currentResults.map((res, i) => {
                return <InfoResults key={i} {...res}/>
            })}
            <DictionaryPagination currentPage={currentPage} results={results} pageNumbers={pageNumbers} />
        </ul>
    </>)
}

function Dictionary() {
    const dictionaryState = useSelector((state: RootStore) => state.dictionaryState)
    const { isNull, dictionaryLoading, dictionaryLoaded, wordInfo, currentResults,
            currentPage, pageNumbers } = dictionaryState
    const regexInfo = 'any case latin letters and numbers'

    return (
        <div className="dictionary text-center">
            <div>
                <h2 className="mb-2">You can get information about any english word</h2>
                <h5 className="mb-4">Just type a word</h5>
            </div>
            <SearchInput regex={`^\\s|[^a-zA-Z\\d\\s+$]`} functionToDispatch={GetWordInfo} regexInfo={regexInfo} autoFocus={true}/>
            {!isNull && <>
                {dictionaryLoading ? 
                    <div className="mt-5">
                        <LoadingSpinner />
                    </div> :
                    <>
                        {!dictionaryLoaded && <SearchInputError />}
                        {wordInfo ? currentResults &&
                            <div className="d-flex flex-column w-100"> 
                                <WordInformation {...wordInfo} currentResults={currentResults}
                                currentPage={currentPage} pageNumbers={pageNumbers} /> 
                            </div>
                        : null}
                    </>
                }
            </>}
        </div>
    )
}

export default Dictionary