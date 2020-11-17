import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { PopoverBody, UncontrolledPopover } from 'reactstrap'
import { PronunciationType, ResultsType } from '../types/dictionaryTypes'
import { GetWordInfo } from '../actions/dictionaryActions'
import { RootStore } from '../app/store'
import LoadingSpinner from './spinner'
import { SearchInput } from './misc/inputs'

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

const getResultArray = (arr: ResultsType[], number: number): ResultsType[] => {
    const resArr: ResultsType[] = []
    if (arr.length >= number) {
        for (let i = 0; i < number; i++) {
            resArr.push(arr[i])
        }
        return resArr
    }
    return getResultArray(arr, number-1)
}

export const InputError: FC = () => {
    return (
        <p className="input_error">Sorry, try another word</p>
    )
}
const AboutDictionaryPopover: FC = () => {
    return (
        <div className="popover_dictionary d-flex flex-row-reverse">
            <img id="AboutDictionaryPopover" draggable="false" src="/images/question-mark.png" alt="?" />
            <UncontrolledPopover placement="top" target="AboutDictionaryPopover">
                <PopoverBody> 
                    Information is displayed using 
                    <a rel="noopener noreferrer" target="_blank" href="https://www.wordsapi.com"> <strong>WordsAPI</strong> </a>
                </PopoverBody>
            </UncontrolledPopover>

        </div>
    )
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
    return (
        <li className="list-group-item">
            <p className="dictionary_light">{partOfSpeech}</p>
            <p className="dictionary_heavy">{definition}</p>
            {examples &&  <p className="dictionary_light">"{examples[0]}"</p>}
            {synonyms &&  <p className="synonyms">Synonyms: {
                synonyms.map((item, i) => <span key={i}>{item}&#160;</span>)
            }</p>}
        </li>
    )
}
const WordInformation: FC<WordInformationI> = ({ results, word, pronunciation }) => {
    if ( !results || !results.length) {
        return (
            <InputError />
        )
    }
    const resultsArray = getResultArray(results, 3)

    return (
        <ul className="list-group p-2">
            <li className="list-group-item">
                <p className="dictionary_heavy word">{word}</p>
                {pronunciation && <div className="dictionary_light"><Pronunciation {...pronunciation}/></div>}
            </li>
            {resultsArray.map((res, i) => {
                return <InfoResults key={i} {...res}/>
            })}
        </ul>
    )
}

function Dictionary() {
    const dictionaryState = useSelector((state: RootStore) => state.wordInfoState)
    const { isNull, dictionaryLoading, dictionaryLoaded, wordInfo } = dictionaryState

    return (
        <div className="dictionary text-center">
            <div> 
                <AboutDictionaryPopover />
                <h2 className="mb-2">You can get information about any english word</h2>
                <h5 className="mb-4">Just type a word</h5>
            </div>
            <SearchInput regex={`^\\s|[^a-zA-Z\\d\\s+$]`} functionToDispatch={GetWordInfo}/>
            {!isNull && <>
                {dictionaryLoading ? 
                    <div className="mt-5">
                        <LoadingSpinner />
                    </div> :
                    <>
                        {!dictionaryLoaded && <InputError />}
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