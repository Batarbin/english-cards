import React, { FC, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Card, CardImg, Alert } from 'reactstrap'
import { Zoom, Fade } from 'react-awesome-reveal'
import { CardTableLoaded, OnCardChosen, OnBackToCategories, GetCategoriesList } from '../actions/cardGameActions'
import { RootStore } from '../app/store'
import LoadingSpinner from './spinner'
import { CardTableType } from '../types/cardGameTypes'
import { DispatchButton } from './misc/buttons'

interface ProgressCounterI {
    resultCount: number
    globalCount: number
}
interface ResultAlertI {
    result: boolean
}
interface CardTableItemI {
    isAnswered: boolean
    title: string
    url: string
    pronunciation: string
    translation: string
}
interface CardTableI {
    cardsTable: CardTableType
    isAnswered: boolean
    result: boolean
    selectedTitle: string
    animationKey: number
    resultCount: number
    globalCount: number
}

const BackToCategoriesButton = () => {
    return (
        <DispatchButton className={'back_button'} firstFunction={OnBackToCategories} secondFunction={GetCategoriesList} text={'Choose another category'}/>
    )
}
const ProgressCounter: FC<ProgressCounterI> = ({ resultCount, globalCount }) => {
    return (
        <div className="progress_counter text-center">
            {`${globalCount} / 5`}
            {resultCount !== 0 && <p>{resultCount} in a row!</p>}
        </div>
    )
}
const ResultAlert: FC<ResultAlertI> = ({ result }) => {
    return (<>
        <Zoom>
            <Alert color={result ? 'success' : 'danger'} className="mb-3">
                {result ? 'Hey, good job!' : 'Try again, you can do it!'}
            </Alert> 
        </Zoom>
    </>)
}
const CardTableItem: FC<CardTableItemI> = ({ isAnswered, title, url, pronunciation, translation }) => {
    const dispatch = useDispatch()
    return (
        <Card body className={isAnswered ? 'text-center justify-content-center' : 'choose_card text-center justify-content-center'}
            onClick = {() => {!isAnswered && dispatch(OnCardChosen(title)) } }
        >
            {isAnswered && <p>{title}</p>}
            <CardImg draggable="false" className="card_image" src={url} alt={title} />
            {isAnswered && <p>Pronunciation: '{pronunciation}'</p>}
            {isAnswered && <p>Translation: {translation}</p>}
        </Card>
    )
}
const CardTableFC: FC<CardTableI> = ({ cardsTable, isAnswered, result, selectedTitle, animationKey, resultCount, globalCount }) => {
    return (
        <div className="cards"> 
            <div className="cards_header d-flex align-items-center">
                <BackToCategoriesButton />
                <ProgressCounter resultCount={resultCount} globalCount={globalCount} />
            </div>
            <div className="d-flex flex-column text-center align-items-center">
                <h3 className={isAnswered ? "mb-3" : "mb-5"}>Which of these cards is <span>{selectedTitle}</span>?</h3>
                {isAnswered && <ResultAlert result={result} /> }
            </div>
            <Fade direction="up" key={animationKey}>
                <Row> 
                    {cardsTable.map(item => <CardTableItem
                        key={item.id}
                        isAnswered={isAnswered}
                        {...item}
                    />)}
                </Row>
            </Fade>
        </div>
    )
}

function CardTable() {
    const dispatch = useDispatch()
    const cardGameState = useSelector((state: RootStore) => state.cardGameState)
    const { cardsTable, isAnswered, result, selectedTitle, animationKey, resultCount, globalCount } = cardGameState
    
    // componentDidMount
    useEffect(() => {
        dispatch(CardTableLoaded())
    }, [dispatch])
    // componentDidUpdate
    let timerID: number
    const clearTable = () => {timerID = window.setTimeout(() => { dispatch(CardTableLoaded()) }, 3000)}
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
    if (!cardsTable || !cardsTable.length) {
        return <LoadingSpinner />
    }
    return (<>
        {globalCount === 6 ? 
            <div className="result_screen">
                <h2>Okay, you are done</h2>
                <div className="result_screen_buttons">
                    <BackToCategoriesButton />
                    <DispatchButton className={'continue_button'} firstFunction={CardTableLoaded} text={'Continue with this category'}/>
                </div>
            </div> :
            <CardTableFC 
                cardsTable={cardsTable}
                isAnswered={isAnswered}
                result={result}
                selectedTitle={selectedTitle}
                animationKey={animationKey}
                resultCount={resultCount}
                globalCount={globalCount}
            />
        }
    </>)
}

export default CardTable