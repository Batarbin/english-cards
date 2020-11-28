import React, { FC, useEffect, useRef } from 'react'
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
    setInputValue: (word: string) => void
}
interface InfoResultsI {
    partOfSpeech: string
    definition: string
    examples?: string[]
    synonyms?: string[]
    setInputValue: (word: string) => void
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
const InfoResults: FC<InfoResultsI> = ({ partOfSpeech, definition, examples, synonyms, setInputValue }) => {
    return (
        <li className="list-group-item">
            <p className="dictionary_light">{partOfSpeech}</p>
            <p className="dictionary_heavy">{definition}</p>
            {examples &&  <p className="dictionary_light">"{examples[0]}"</p>}
            {synonyms &&  <p className="synonyms">Synonyms: {
                synonyms.map((item, i) => <span key={i} onClick={() => setInputValue(item)}>{item}</span>)
            }</p>}
        </li>
    )
}
const WordInformation: FC<WordInformationI> = ({ results, word, pronunciation, currentResults, setInputValue }) => {
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
                return <InfoResults key={i} {...res} setInputValue={setInputValue} />
            })}
            <DictionaryPagination />
        </ul>
    </>)
}

function Dictionary() {
    const dispatch = useDispatch()
    const dictionaryState = useSelector((state: RootStore) => state.dictionaryState)
    const { isNull, dictionaryLoading, dictionaryLoaded, wordInfo, currentResults } = dictionaryState
    const regexInfo = 'any case latin letters and numbers'

    const setInputValue = (word: string) => {
        dispatch(GetWordInfo(word))
        dispatch(GetSearchInputValue(word))
    }
    const prevSearchResultRef = useRef('')
    useEffect(() => {
        if (wordInfo) {
            prevSearchResultRef.current = wordInfo.word
        }
    })
    const PrevSearchResult = () => {
        const prevSearchResultWord = prevSearchResultRef.current
        if (prevSearchResultWord && wordInfo?.word === prevSearchResultWord || isNull || prevSearchResultWord === '') {
            return null
        }
        return (
            <p className="prev_search_res"
                onClick={() => {setInputValue(prevSearchResultWord)}}
            >Back to <span>{prevSearchResultWord}</span></p>
        )
    }

    return (
        <div className="dictionary text-center">
            <div>
                <h2 className="mb-2">You can get information about any english word</h2>
                <h5 className="mb-4">Just type a word</h5>
            </div>
            <div className="dictionary_form">
                {!isNull && <PrevSearchResult />}
                <SearchInput regex={`^\\s|[^a-zA-Z\\d\\s+$]`} functionToDispatch={GetWordInfo} regexInfo={regexInfo} autoFocus={true}/>
            </div>
            {!isNull && <>
                {dictionaryLoading ? 
                    <div className="mt-5">
                        <LoadingSpinner />
                    </div> :
                    <>
                        {!dictionaryLoaded && <SearchInputError />}
                        {wordInfo ? currentResults &&
                            <div className="d-flex flex-column w-100"> 
                                <WordInformation {...wordInfo} currentResults={currentResults} setInputValue={setInputValue} /> 
                            </div>
                        : null}
                    </>
                }
            </>}
        </div>
    )
}

export default Dictionary