import React, { useState, useRef } from 'react';
import debounce from 'lodash.debounce';
import { Form, FormGroup, Input } from 'reactstrap';
import '../index.scss';

const getResultArray = (arr, number) => { // if need to limit the number of elements
    const items = []
    if (arr.length >= number) {
        for (let i = 0; i < number; i++) {
            items.push(arr[i])
        }
        return items
    }
    return getResultArray(arr, number-1)
}

const Pronunciation = ({ pronunciation }) => {
    const { all, noun, verb } = pronunciation
    if (noun && verb) {
        return (<>
            <p className="dictionary_light">noun: /{noun}/</p>
            <p className="dictionary_light">verb: /{verb}/</p>
        </>)
    } else if (!verb && noun) {
        return <p className="dictionary_light">/{noun}/</p>
    } else if (!noun && verb) {
        return <p className="dictionary_light">/{verb}/</p>
    } else if (!noun && !verb && all) {
        return <p className="dictionary_light">/{pronunciation.all}/</p>
    } else if (pronunciation) {
        return <p className="dictionary_light">/{pronunciation}/</p>
    }
    return null
}
const InfoResults = ({ partOfSpeech, definition, examples, synonyms }) => {
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
const WordInformation = ({ success, results, word, pronunciation }) => {
    if (success === false || !results || !results.length) {
        return (
            <p className="dictionary_error">Sorry, try another word</p>
        )
    }  
    let items = getResultArray(results, 3)

    return (
        <ul className="list-group p-2">
            <li className="list-group-item">
                <p className="dictionary_heavy word">{word}</p>
                {pronunciation && <Pronunciation pronunciation={pronunciation}/>}
            </li>
            {items.map((item, i) => <InfoResults key={i} {...item} /> )}
        </ul>
    )
}

const Dictionary = ({ showInfo, showInfoBool, wordInfo }) => {

    const [value, setValue] = useState('')
    
    const debouncedSave = useRef(debounce(nextValue => showInfo(nextValue), 700))
		.current
    const handleChange = e => {
        const { value: nextValue } = e.target
        setValue(nextValue)
        debouncedSave(nextValue)
    };

    return (
        <div className="dictionary d-flex flex-column text-center align-items-center justify-content-center">
            <h4 className="mb-2">You can get information about any english word</h4>
            <h5 className="mb-4">Just type a word</h5>
            <Form inline className="mb-4" onSubmit={e => { e.preventDefault(); }}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="word" autoComplete="off" name="word" placeholder="Type a word" bsSize="lg" value={value} onChange={handleChange} />
                </FormGroup>
            </Form>
            <div className="d-flex flex-column w-100">{showInfoBool && <WordInformation {...wordInfo} /> }</div>
        </div>
    )
}

export default Dictionary;