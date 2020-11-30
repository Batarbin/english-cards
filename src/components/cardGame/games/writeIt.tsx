import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Fade } from 'react-awesome-reveal'
import { WriteItLoaded, OnCardChosen } from '../../../actions/cardGameActions'
import { RootStore } from '../../../app/store'
import LoadingSpinner from '../../spinner'
import { CardType } from '../../../types/cardGameTypes'
import { InputCancelButton } from '../../misc/buttons'

interface WriteItTableItemsI {
    isAnswered: boolean
    title: string
    url: string
    pronunciation: string
    translation: string
}
interface WriteItTableI {
    writeItTable: CardType
    isAnswered: boolean
    result: boolean
    selectedTitle: string
    animationKey: number
    resultCount: number
    globalCount: number
}

const WriteItTableItems: FC<WriteItTableItemsI> = ({ isAnswered, title, url, pronunciation, translation }) => {
    const dispatch = useDispatch()
    const [cardInputValue, setCardInputValue] = useState('')
    const cardInput = useRef() as React.MutableRefObject<HTMLInputElement>

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value: nextValue } = e.target
        nextValue = nextValue.replace(/^\s|[^a-zA-Z\s+$]/, "")
        nextValue = nextValue.replace(/\s{2}/g, " ")
        setCardInputValue(nextValue)
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (cardInputValue) {
            dispatch(OnCardChosen(cardInputValue))
        }
    }
    const clearInput = () => {
        setCardInputValue('')
        cardInput.current.focus()
    }

    return (
        <div className="write_it">
            <div className={isAnswered ? 'card' : 'card small_cards'} >
                {isAnswered && <p><span>{title}</span></p>}
                <img draggable="false" src={url} alt={title} />
                {isAnswered && <p>Pronunciation: <span>'{pronunciation}'</span></p>}
                {isAnswered && <p>Translation: <span>{translation}</span></p>}
            </div>
            {!isAnswered && 
                <form className="input_form" onSubmit={handleSubmit}>
                    <input
                        autoFocus
                        ref={cardInput}
                        className="seacrh_input"
                        type="text"
                        autoComplete="off"
                        name="word"
                        placeholder="Type a word"
                        value={cardInputValue}
                        onChange={handleChange}
                    />
                    {cardInputValue && <InputCancelButton clearFunction={clearInput}/>}
                    <input type="submit" value="Check" className="write_it_button"/>
                </form>
            }
        </div>
    )
}
const WriteItTable: FC<WriteItTableI> = ({ writeItTable, isAnswered, animationKey }) => {
    return (
        <div className="card_table_wrapper card_game">
            <Fade direction="up" key={animationKey}>
                <div className="card_table_row"> 
                    {writeItTable.map(item => <WriteItTableItems
                        key={item.id}
                        isAnswered={isAnswered}
                        {...item}
                    />)}
                </div>
            </Fade>
        </div>
    )
}

function WriteIt() {
    const dispatch = useDispatch()
    const cardGameState = useSelector((state: RootStore) => state.cardGameState)
    const { writeItTable, isAnswered, result, selectedTitle, animationKey, resultCount, globalCount } = cardGameState
    
    // componentDidMount
    useEffect(() => {
        dispatch(WriteItLoaded())
    }, [dispatch])
    // componentDidUpdate
    let timerID: number
    const clearTable = () => {timerID = window.setTimeout(() => { dispatch(WriteItLoaded()) }, 3000)}
    const mounted = useRef(true)
    useEffect(() => {
        if (mounted.current) {
            mounted.current = false
        } 
        if (isAnswered) {
            clearTable()
        }
        return () => {
          clearTimeout(timerID)
        }
    })
    // render
    if (!writeItTable || !writeItTable.length) {
        return <LoadingSpinner />
    }
    return (<>
        <WriteItTable 
            writeItTable={writeItTable}
            isAnswered={isAnswered}
            result={result}
            selectedTitle={selectedTitle}
            animationKey={animationKey}
            resultCount={resultCount}
            globalCount={globalCount}
        />
    </>)
}

export default WriteIt