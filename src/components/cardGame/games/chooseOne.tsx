import React, { FC, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Fade } from 'react-awesome-reveal'
import { ChooseOneTableLoaded, OnCardChosen } from '../../../actions/cardGameActions'
import { RootStore } from '../../../app/store'
import LoadingSpinner from '../../spinner'
import { CardType } from '../../../types/cardGameTypes'

interface ChooseOneTableItemsI {
    isAnswered: boolean
    title: string
    url: string
    pronunciation: string
    translation: string
}
interface ChooseOneTableI {
    chooseOneTable: CardType
    isAnswered: boolean
    result: boolean
    selectedTitle: string
    animationKey: number
    resultCount: number
    globalCount: number
}

const ChooseOneTableItems: FC<ChooseOneTableItemsI> = ({ isAnswered, title, url, pronunciation, translation }) => {
    const dispatch = useDispatch()
    return (
        <div className={isAnswered ? 'card' : 'card small_cards'}
            onClick = {() => {!isAnswered && dispatch(OnCardChosen(title)) } }
        >
            {isAnswered && <p><span>{title}</span></p>}
            <img draggable="false" src={url} alt={title} />
            {isAnswered && <p>Pronunciation: <span>'{pronunciation}'</span></p>}
            {isAnswered && <p>Translation: <span>{translation}</span></p>}
        </div>
    )
}
const ChooseOneTable: FC<ChooseOneTableI> = ({ chooseOneTable, isAnswered, animationKey }) => {
    return (
        <div className="card_table_wrapper card_game">
            <Fade direction="up" key={animationKey}>
                <div className="card_table_row"> 
                    {chooseOneTable.map(item => <ChooseOneTableItems
                        key={item.id}
                        isAnswered={isAnswered}
                        {...item}
                    />)}
                </div>
            </Fade>
        </div>
    )
}

function ChooseOne() {
    const dispatch = useDispatch()
    const cardGameState = useSelector((state: RootStore) => state.cardGameState)
    const { chooseOneTable, isAnswered, result, selectedTitle, animationKey, resultCount, globalCount } = cardGameState
    
    // componentDidMount
    useEffect(() => {
        dispatch(ChooseOneTableLoaded())
    }, [dispatch])
    // componentDidUpdate
    let timerID: number
    const clearTable = () => {timerID = window.setTimeout(() => { dispatch(ChooseOneTableLoaded()) }, 3000)}
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
    if (!chooseOneTable || !chooseOneTable.length) {
        return <LoadingSpinner />
    }
    return (<>
        <ChooseOneTable 
            chooseOneTable={chooseOneTable}
            isAnswered={isAnswered}
            result={result}
            selectedTitle={selectedTitle}
            animationKey={animationKey}
            resultCount={resultCount}
            globalCount={globalCount}
        />
    </>)
}

export default ChooseOne