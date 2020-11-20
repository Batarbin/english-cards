import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PronunciationType, ResultsType } from '../types/dictionaryTypes'
import { GetWordInfo } from '../actions/dictionaryActions'
import { RootStore } from '../app/store'
import LoadingSpinner from './spinner'
import { SearchInput, SearchInputError } from './misc/searchInput'
import { AboutDictionaryAPIOverlay } from './misc/overlays'

interface WordInformationI {
    results: ResultsType[]
    word: string
    pronunciation?: PronunciationType
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
                synonyms.map((item, i) => <span key={i} onClick={() => dispatch(GetWordInfo(item))}>{item}</span>)
            }</p>}
        </li>
    )
}
const WordInformation: FC<WordInformationI> = ({ results, word, pronunciation }) => {
    const [currentPage, setCurrentPage] = useState(1)
    if ( !results || !results.length) {
        return (
            <SearchInputError />
        )
    }
    
    const indexOfLastResult = currentPage * 3
    const indexOfFirstResult = indexOfLastResult - 3
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult)
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(results.length / 3); i++) {
        pageNumbers.push(i)
    }
    function handleClick(number: number) {
        if (number !== currentPage && number > 0 && number < (pageNumbers.length + 1)) {
            setCurrentPage(number)
        }
    }
    function pageClassName(number: number) {
        if (currentPage === number) {
            return 'current'
        } else {
            return ''
        }
    }
    const RenderPageNumbers = pageNumbers.map(number => {
        return (
          <span className={pageClassName(number)}
            key={number}
            onClick={() => handleClick(number)}
          >
            {number}
          </span>
        )
    })

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
        </ul>
        <div className="dictionary_pages">
            <span onClick={() => handleClick(currentPage - 1)}>&lt;</span>
            {RenderPageNumbers}
            <span onClick={() => handleClick(currentPage + 1)}>&gt;</span>
        </div>
    </>)
}

function Dictionary() {
    const dictionaryState = useSelector((state: RootStore) => state.wordInfoState)
    const { isNull, dictionaryLoading, dictionaryLoaded, wordInfo } = dictionaryState
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
                        <div className="d-flex flex-column w-100"> 
                            {wordInfo && <WordInformation {...wordInfo}/>} 
                        </div>
                    </>
                }
            </>}
        </div>
    )
}

export default Dictionary