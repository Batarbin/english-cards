import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { onChangeWordInput, showInfo } from '../services/actions';
import '../index.scss';

const mstp = (store) => store
const mdtp = (dispatch) => bindActionCreators({
    onChangeWordInput,
    showInfo
}, dispatch)

const getLength = (arr) => {
    const items = []
    let itemsValue
    if (arr.length > 3) {
        itemsValue = 3
    } else if (arr.length === 1 ) {
        itemsValue = 1
    } else {
        itemsValue = 2
    } 
    for (let i = 0; i < itemsValue; i++) {
        items.push(arr[i])
    }
    return items
}

const InfoResults = ({ partOfSpeech, definition, examples, synonyms }) => {
    let items = []
    if (synonyms) {
        items = getLength(synonyms)
    }
    return (
        <li className="list-group-item">
            <p className="dictionary_light">{partOfSpeech}</p>
            <p className="dictionary_heavy">{definition}</p>
            {examples &&  <p className="dictionary_light">"{examples[0]}"</p>}
            {synonyms &&  <p className="synonyms">Synonyms: {
                items.map((item, i) => <span key={i}>{item}&#160;</span>)
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
    let items = getLength(results)

    return (
        <ul className="list-group p-2">
            <li className="list-group-item">
                <p className="dictionary_heavy word">{word}</p>
                {pronunciation && <p className="dictionary_light">/{pronunciation.all}/</p>}
            </li>
            {items.map((item, i) => <InfoResults key={i} {...item} /> )}
        </ul>
    )
}

class Dictionary extends Component {
    render() {
        const { onChangeWordInput, word, showInfo, showInfoBool, wordInfo } = this.props
        
        function handleChange(e) {
            onChangeWordInput(e)
        }
        function onWordShow() {
            if (word && !showInfoBool) {
                showInfo(word)
            }
        }
    
        return (
            <div className="dictionary d-flex flex-column text-center align-items-center justify-content-center">
                <h4 className="mb-2">You can get information about any english word</h4>
                <h5 className="mb-4">Type a word and press the button</h5>
                <Form inline className="mb-4" onSubmit={e => { e.preventDefault(); onWordShow() }}>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="word" autoComplete="off" name="word" id="wordInput" placeholder="Type a word" bsSize="lg" onChange={handleChange} />
                    </FormGroup>
                    <Button color="success" className="checkword_button"
                        onClick = { onWordShow }>
                        Get information
                    </Button>
                </Form>
                <div className="d-flex flex-column w-100">{showInfoBool && <WordInformation {...wordInfo} /> }</div>
            </div>
        )
    }
}

export default connect(mstp, mdtp)(Dictionary);